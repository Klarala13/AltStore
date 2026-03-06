import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AppStatus, Severity } from "@altstore/db";

export interface AdminAppFilters {
  status?: AppStatus;
  page: number;
  limit: number;
}

export interface SecurityLogFilters {
  severity?: Severity;
  page: number;
  limit: number;
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /** Returns paginated list of apps, defaulting to PENDING_REVIEW for the moderation queue. */
  async findApps(filters: AdminAppFilters) {
    const { status = "PENDING_REVIEW", page, limit } = filters;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.app.findMany({
        where: { status },
        include: {
          developer: { select: { id: true, name: true, email: true } },
          _count: { select: { versions: true } },
        },
        orderBy: { createdAt: "asc" }, // Oldest first — FIFO review queue
        skip,
        take: limit,
      }),
      this.prisma.app.count({ where: { status } }),
    ]);

    return { items, total, page, limit };
  }

  /** Approve or suspend an app and create a corresponding SecurityLog entry. */
  async updateAppStatus(appId: string, newStatus: AppStatus, adminId: string) {
    const app = await this.prisma.app.findUnique({ where: { id: appId } });
    if (!app) throw new NotFoundException(`App ${appId} not found`);

    const [updated] = await this.prisma.$transaction([
      this.prisma.app.update({
        where: { id: appId },
        data: { status: newStatus },
      }),
      this.prisma.securityLog.create({
        data: {
          entityType: "APP",
          entityId: appId,
          action: newStatus === "ACTIVE" ? "APP_APPROVED" : `APP_STATUS_CHANGED_TO_${newStatus}`,
          severity: newStatus === "SUSPENDED" || newStatus === "REMOVED" ? "WARNING" : "INFO",
          metadata: { previousStatus: app.status, newStatus },
          performedBy: adminId,
        },
      }),
    ]);

    return updated;
  }

  /** Returns paginated security logs, most recent first. */
  async findSecurityLogs(filters: SecurityLogFilters) {
    const { severity, page, limit } = filters;
    const skip = (page - 1) * limit;

    const where = severity ? { severity } : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.securityLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.securityLog.count({ where }),
    ]);

    return { items, total, page, limit };
  }
}
