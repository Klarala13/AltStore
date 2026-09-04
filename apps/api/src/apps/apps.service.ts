import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAppDto, UpdateAppDto } from "./apps.dto";
import { AppStatus, Category, Platform } from "@altstore/db";
import type { DeveloperAppDetailDto, DeveloperAppListDto } from "@altstore/types";

export interface AppFilters {
  category?: Category;
  platform?: Platform;
  status?: AppStatus;
  page: number;
  limit: number;
}

export interface SearchFilters {
  q: string;
  category?: Category;
  platform?: Platform;
  page: number;
  limit: number;
}

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  private formatBytes(bytes: bigint): string {
    const value = Number(bytes);
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  }

  private buildVersionList(
    versions: Array<{
      id: string;
      versionName: string;
      platform: Platform;
      fileSize: bigint;
      changelog: string;
      minOs: string;
      publishedAt: Date | null;
      fileKey: string;
    }>
  ) {
    return versions.map((version, index) => {
      const previous = versions[index + 1];
      const sizeDelta = previous ? Number(version.fileSize - previous.fileSize) : null;

      return {
        id: version.id,
        versionName: version.versionName,
        platform: version.platform,
        fileSize: this.formatBytes(version.fileSize),
        fileSizeDelta:
          sizeDelta === null
            ? null
            : `${sizeDelta >= 0 ? "+" : "-"}${this.formatBytes(BigInt(Math.abs(sizeDelta)))}`,
        sizeTrend: sizeDelta === null ? null : sizeDelta >= 0 ? "larger" : "smaller",
        changelog: version.changelog,
        minOs: version.minOs,
        publishedAt: version.publishedAt?.toISOString() ?? null,
        isLatest: index === 0,
        fileKey: version.fileKey,
      };
    });
  }

  async findAll(filters: AppFilters) {
    const { category, platform, status, page, limit } = filters;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.app.findMany({
        where: {
          ...(category && { category }),
          ...(platform && { platform }),
          status: status ?? "ACTIVE",
        },
        include: {
          developer: { select: { id: true, name: true } },
          versions: {
            where: { status: "APPROVED" },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { versionName: true, fileSize: true, platform: true },
          },
        },
        orderBy: { totalDownloads: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.app.count({
        where: {
          ...(category && { category }),
          ...(platform && { platform }),
          status: status ?? "ACTIVE",
        },
      }),
    ]);

    return {
      items: items.map((app) => {
        const latest = app.versions[0] ?? null;
        return {
          id: app.id,
          slug: app.slug,
          name: app.name,
          category: app.category,
          iconUrl: app.iconUrl,
          // La portada de la tarjeta es la primera captura. No hay columna
          // coverUrl y no hace falta: el seed ya guarda la portada aqui.
          coverUrl: app.screenshots[0],
          shortDesc: app.shortDesc,
          platform: app.platform,
          latestVersion: latest?.versionName ?? null,
          latestFileSize: latest ? this.formatBytes(latest.fileSize) : null,
          totalDownloads: app.totalDownloads,
          rating: app.avgRating ?? null,
        };
      }),
      total,
      page,
      limit,
    };
  }

  async search(filters: SearchFilters) {
    const { q, category, platform, page, limit } = filters;
    const skip = (page - 1) * limit;
    const term = q.trim();

    // Use Postgres ILIKE for broad compatibility; pg_trgm index (added via migration)
    // will accelerate this when the extension is enabled.
    const where = {
      status: "ACTIVE" as const,
      ...(category && { category }),
      ...(platform && { platform }),
      OR: [
        { name: { contains: term, mode: "insensitive" as const } },
        { shortDesc: { contains: term, mode: "insensitive" as const } },
        { description: { contains: term, mode: "insensitive" as const } },
        { tags: { some: { name: { contains: term, mode: "insensitive" as const } } } },
      ],
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.app.findMany({
        where,
        include: {
          developer: { select: { id: true, name: true } },
          versions: {
            where: { status: "APPROVED" },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { versionName: true, fileSize: true, platform: true },
          },
        },
        orderBy: { totalDownloads: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.app.count({ where }),
    ]);

    return {
      items: items.map((app) => {
        const latest = app.versions[0] ?? null;
        return {
          id: app.id,
          slug: app.slug,
          name: app.name,
          category: app.category,
          iconUrl: app.iconUrl,
          // La portada de la tarjeta es la primera captura. No hay columna
          // coverUrl y no hace falta: el seed ya guarda la portada aqui.
          coverUrl: app.screenshots[0],
          shortDesc: app.shortDesc,
          platform: app.platform,
          latestVersion: latest?.versionName ?? null,
          latestFileSize: latest ? this.formatBytes(latest.fileSize) : null,
          totalDownloads: app.totalDownloads,
          rating: app.avgRating ?? null,
        };
      }),
      total,
      page,
      limit,
    };
  }

  async findBySlug(slug: string) {
    const app = await this.prisma.app.findUnique({
      where: { slug },
      include: {
        developer: { select: { id: true, name: true, verified: true, country: true } },
        versions: {
          where: { status: "APPROVED" },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            versionName: true,
            platform: true,
            fileSize: true,
            changelog: true,
            minOs: true,
            publishedAt: true,
            fileKey: true,
          },
        },
        tags: true,
      },
    });
    if (!app) throw new NotFoundException(`App "${slug}" not found`);

    const versions = this.buildVersionList(app.versions);
    const latestVersion = versions[0] ?? null;

    return {
      id: app.id,
      slug: app.slug,
      name: app.name,
      category: app.category,
      iconUrl: app.iconUrl,
      shortDesc: app.shortDesc,
      platform: app.platform,
      latestVersion: latestVersion?.versionName ?? null,
      latestFileSize: latestVersion?.fileSize ?? null,
      totalDownloads: app.totalDownloads,
      rating: app.avgRating ?? null,
      description: app.description,
      screenshots: app.screenshots,
      websiteUrl: app.websiteUrl,
      privacyUrl: app.privacyUrl,
      sourceUrl: app.sourceUrl,
      developer: app.developer,
      versions,
      tags: app.tags,
    };
  }

  async create(developerId: string, dto: CreateAppDto) {
    return this.prisma.app.create({
      data: {
        ...dto,
        developerId,
        screenshots: dto.screenshots ?? [],
        platform: dto.platform ?? "ANDROID",
      },
    });
  }

  async update(id: string, developerId: string, dto: UpdateAppDto) {
    await this.assertOwnership(id, developerId);
    return this.prisma.app.update({ where: { id }, data: dto });
  }

  async delete(id: string, developerId: string): Promise<void> {
    await this.assertOwnership(id, developerId);
    await this.prisma.app.update({
      where: { id },
      data: { status: "REMOVED" },
    });
  }

  /**
   * GET /apps/mine — the authenticated developer's own apps.
   *
   * Deliberately different from findAll: no status filter, because a developer
   * must see an app that is still PENDING_REVIEW, and it carries the version
   * count the dashboard table renders.
   */
  async findByDeveloper(
    developerId: string,
    page: number,
    limit: number
  ): Promise<DeveloperAppListDto> {
    const skip = (page - 1) * limit;
    const where = { developerId, status: { not: "REMOVED" as const } };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.app.findMany({
        where,
        include: { _count: { select: { versions: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.app.count({ where }),
    ]);

    return {
      items: items.map((app) => ({
        id: app.id,
        slug: app.slug,
        name: app.name,
        category: app.category,
        status: app.status,
        iconUrl: app.iconUrl,
        totalDownloads: app.totalDownloads,
        versionCount: app._count.versions,
      })),
      total,
      page,
      limit,
    };
  }

  /**
   * GET /apps/mine/:appId — one owned app, looked up by id (not slug) and
   * including every version whatever its scan status.
   */
  async findOwnedById(appId: string, developerId: string): Promise<DeveloperAppDetailDto> {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      include: {
        versions: { orderBy: { createdAt: "desc" } },
        _count: { select: { versions: true } },
      },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();

    return {
      id: app.id,
      slug: app.slug,
      name: app.name,
      bundleId: app.bundleId,
      category: app.category,
      status: app.status,
      iconUrl: app.iconUrl,
      totalDownloads: app.totalDownloads,
      versionCount: app._count.versions,
      description: app.description,
      shortDesc: app.shortDesc,
      platform: app.platform,
      websiteUrl: app.websiteUrl,
      privacyUrl: app.privacyUrl,
      sourceUrl: app.sourceUrl,
      createdAt: app.createdAt.toISOString(),
      versions: app.versions.map((version, index) => {
        // versions are newest-first, so the next entry is the previous release
        const previous = app.versions[index + 1];
        return {
          id: version.id,
          versionName: version.versionName,
          versionCode: version.versionCode,
          platform: version.platform,
          status: version.status,
          fileSize: Number(version.fileSize),
          fileSha256: version.fileSha256,
          changelog: version.changelog,
          minOs: version.minOs,
          createdAt: version.createdAt.toISOString(),
          publishedAt: version.publishedAt?.toISOString() ?? null,
          isLatest: index === 0,
          sizeDiff: previous ? Number(version.fileSize) - Number(previous.fileSize) : null,
        };
      }),
    };
  }

  private async assertOwnership(appId: string, developerId: string) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      select: { developerId: true },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();
  }
}
