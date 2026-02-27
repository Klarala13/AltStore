import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAppDto, UpdateAppDto } from "./apps.dto";
import { AppStatus, Category, Platform } from "@altstore/db";

export interface AppFilters {
  category?: Category;
  platform?: Platform;
  status?: AppStatus;
  page: number;
  limit: number;
}

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

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

    return { items, total, page, limit };
  }

  async findBySlug(slug: string) {
    const app = await this.prisma.app.findUnique({
      where: { slug },
      include: {
        developer: { select: { id: true, name: true } },
        versions: {
          where: { status: "APPROVED" },
          orderBy: { createdAt: "desc" },
        },
        tags: true,
      },
    });
    if (!app) throw new NotFoundException(`App "${slug}" not found`);
    return app;
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

  private async assertOwnership(appId: string, developerId: string) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      select: { developerId: true },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();
  }
}
