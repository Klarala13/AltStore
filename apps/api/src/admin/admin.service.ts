import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AppStatus, Severity } from "@appia/db";

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
          // El veredicto del escaneo viaja con cada app: sin el, la cola pide
          // aprobar a ciegas. Son apps pendientes de revision, asi que la lista
          // de versiones es corta.
          versions: {
            select: { id: true, versionName: true, status: true, scannedAt: true },
            orderBy: { createdAt: "desc" },
          },
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

    if (newStatus === "ACTIVE") await this.assertScanned(appId);

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

  /**
   * Publicar exige que al menos una version haya pasado el escaneo.
   *
   * El boton de la cola ya se desactiva solo, pero eso es un adorno: la regla
   * tiene que vivir aqui, que es por donde pasan el panel, el proxy del web y
   * cualquier llamada directa al API. El SQL de publicacion a mano lleva este
   * mismo freno (scripts/publish-own-apps.sql); el panel era el camino que lo
   * saltaba.
   *
   * No distingue "aun escaneando" de "salio mal" porque hoy el estado tampoco
   * lo hace: un escaneo que revienta acaba en REJECTED igual que un APK
   * infectado (falta SCAN_FAILED). Mientras sea asi, lo unico seguro es
   * exigir un APPROVED explicito.
   */
  private async assertScanned(appId: string): Promise<void> {
    const approved = await this.prisma.version.count({
      where: { appId, status: "APPROVED" },
    });
    if (approved > 0) return;

    const total = await this.prisma.version.count({ where: { appId } });
    throw new ConflictException(
      total === 0
        ? "Esta app todavia no tiene ninguna version subida."
        : "Ninguna version ha pasado el escaneo de VirusTotal. No se puede publicar."
    );
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
