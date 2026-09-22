import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { clientIp, hashIp } from "../hash-ip";

export const RATE_LIMIT_KEY = "rate-limit";

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export const RateLimit = (options: RateLimitOptions) => SetMetadata(RATE_LIMIT_KEY, options);

interface Window {
  count: number;
  resetAt: number;
}

/**
 * Fixed-window limiter for endpoints that accept anonymous traffic.
 *
 * Counters live in this process, so a second API instance would get its own
 * allowance. That is deliberate for now — the alternative is a Redis round trip
 * on every request, and Railway runs a single instance. Move the map to Redis
 * before scaling horizontally.
 */
@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly windows = new Map<string, Window>();
  private lastSweep = 0;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.get<RateLimitOptions | undefined>(
      RATE_LIMIT_KEY,
      context.getHandler()
    );
    if (!options) return true;

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, unknown>;
      ip?: string;
    }>();

    const salt = this.config.get<string>("IP_HASH_SALT") ?? "default-salt";
    const ip = clientIp(request.headers, request.ip ?? "unknown");
    const key = `${context.getHandler().name}:${hashIp(ip, salt)}`;

    const now = Date.now();
    this.sweep(now);

    const window = this.windows.get(key);
    if (!window || window.resetAt <= now) {
      this.windows.set(key, { count: 1, resetAt: now + options.windowMs });
      return true;
    }

    if (window.count >= options.limit) {
      const retryAfter = Math.ceil((window.resetAt - now) / 1000);
      throw new HttpException(
        {
          message: "Too many submissions from this address. Try again later.",
          retryAfterSeconds: retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    window.count += 1;
    return true;
  }

  /** Without this the map grows one entry per address, forever. */
  private sweep(now: number): void {
    if (now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    for (const [key, window] of this.windows) {
      if (window.resetAt <= now) this.windows.delete(key);
    }
  }
}
