import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

/**
 * Restricts an endpoint to calls coming through the Next.js front end.
 *
 * The API is reachable from the public internet, so anything that trusts
 * X-Forwarded-For — the rate limiter, for one — is only as good as the promise
 * that requests arrived via the proxy. Without this, the submission limit is
 * bypassed by sending a different forwarded address each time.
 *
 * Fails closed: no configured key means no anonymous submissions, which is the
 * safer way to be wrong.
 */
@Injectable()
export class InternalKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>("INTERNAL_API_KEY");
    if (!expected) throw new ForbiddenException("Internal key not configured");

    const request = context.switchToHttp().getRequest<{ headers: Record<string, unknown> }>();
    const provided = request.headers["x-internal-key"];
    if (typeof provided !== "string" || !timingSafeEqual(provided, expected)) {
      throw new ForbiddenException("Invalid internal key");
    }

    return true;
  }
}

/** Compares without leaking length or position through timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const aHash = crypto.createHash("sha256").update(a).digest();
  const bHash = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(aHash, bHash);
}
