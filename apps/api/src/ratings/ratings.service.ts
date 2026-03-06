import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpsertRatingDto } from "./ratings.dto";

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(appSlug: string, userId: string, dto: UpsertRatingDto) {
    const app = await this.prisma.app.findUnique({
      where: { slug: appSlug },
      select: { id: true },
    });
    if (!app) throw new NotFoundException(`App "${appSlug}" not found`);

    // Upsert rating and recompute avgRating in a single transaction
    const [rating] = await this.prisma.$transaction([
      this.prisma.rating.upsert({
        where: { appId_userId: { appId: app.id, userId } },
        create: { appId: app.id, userId, ...dto },
        update: { ...dto },
      }),
      // Recompute avgRating on App — Prisma aggregate in raw SQL for atomicity
      this.prisma.$executeRaw`
        UPDATE "App"
        SET "avgRating" = (
          SELECT AVG(score::float) FROM "Rating" WHERE "appId" = ${app.id}
        )
        WHERE id = ${app.id}
      `,
    ]);

    return rating;
  }

  async findByApp(appSlug: string, page: number, limit: number) {
    const app = await this.prisma.app.findUnique({
      where: { slug: appSlug },
      select: { id: true, avgRating: true },
    });
    if (!app) throw new NotFoundException(`App "${appSlug}" not found`);

    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.rating.findMany({
        where: { appId: app.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          score: true,
          title: true,
          body: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.rating.count({ where: { appId: app.id } }),
    ]);

    return { items, total, page, limit, avgRating: app.avgRating };
  }
}
