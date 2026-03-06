import { Controller, Get, Patch, Param, Body, Query, Request, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UpdateAppStatusDto } from "./admin.dto";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtPayload } from "../auth/jwt.strategy";
import { AppStatus, Severity } from "@altstore/db";

interface AdminRequest extends Request {
  user: JwtPayload;
}

@Controller("admin")
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /** GET /admin/apps?status=PENDING_REVIEW&page=1&limit=20 */
  @Get("apps")
  findApps(
    @Query("status") status?: AppStatus,
    @Query("page") page = "1",
    @Query("limit") limit = "20"
  ) {
    return this.adminService.findApps({
      status,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  /** PATCH /admin/apps/:id/status */
  @Patch("apps/:id/status")
  updateAppStatus(
    @Param("id") id: string,
    @Body() dto: UpdateAppStatusDto,
    @Request() req: AdminRequest
  ) {
    return this.adminService.updateAppStatus(id, dto.status, req.user.sub);
  }

  /** GET /admin/security-logs?severity=CRITICAL&page=1&limit=50 */
  @Get("security-logs")
  findSecurityLogs(
    @Query("severity") severity?: Severity,
    @Query("page") page = "1",
    @Query("limit") limit = "50"
  ) {
    return this.adminService.findSecurityLogs({
      severity,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }
}
