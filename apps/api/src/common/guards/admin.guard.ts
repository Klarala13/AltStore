import { Injectable, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "../../auth/jwt.strategy";

/**
 * AdminGuard — extends JWT auth and additionally requires isAdmin: true in the token payload.
 * Usage: @UseGuards(AdminGuard)
 */
@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First validate the JWT (throws UnauthorizedException if invalid)
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    if (!request.user.isAdmin) {
      throw new ForbiddenException("Admin access required");
    }

    return true;
  }
}
