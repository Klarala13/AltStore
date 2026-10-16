import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateDeveloperDto } from "./developers.dto";

@Injectable()
export class DevelopersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
      include: { apps: { select: { id: true, name: true, slug: true, status: true } } },
    });
    if (!developer) throw new NotFoundException(`Developer ${id} not found`);
    return developer;
  }

  async update(id: string, requesterId: string, dto: UpdateDeveloperDto) {
    if (id !== requesterId) throw new ForbiddenException();
    return this.prisma.developer.update({ where: { id }, data: dto });
  }

  /**
   * GDPR Art. 17 — Right to erasure.
   *
   * The row is anonymised in place, not deleted. This used to call
   * `developer.delete()` and **always threw**: `App.developerId` references
   * `Developer.id` with `ON DELETE RESTRICT`, and setting the apps to `REMOVED`
   * does not detach them — it only changes a status column, so the foreign key
   * still points at the row being deleted. The endpoint therefore failed for
   * every developer who had ever published an app, which is precisely the set
   * of people likely to invoke Article 17.
   *
   * Anonymising satisfies erasure: once the data can no longer be attributed to
   * a person, it is outside the GDPR's scope. It also avoids a schema change and
   * keeps every existing join working, because the row still exists.
   *
   * The published apps are withdrawn (`REMOVED`), which is what the original
   * implementation intended.
   */
  async gdprErasure(id: string, requesterId: string): Promise<void> {
    if (id !== requesterId) throw new ForbiddenException();

    const developer = await this.prisma.developer.findUnique({ where: { id } });
    if (!developer) throw new NotFoundException(`Developer ${id} not found`);

    await this.prisma.$transaction([
      this.prisma.app.updateMany({
        where: { developerId: id },
        data: { status: "REMOVED" },
      }),
      this.prisma.developer.update({
        where: { id },
        data: {
          // `.invalid` is reserved by RFC 2606, so this address can never route
          // anywhere. The id keeps the unique constraint satisfied.
          email: `erased-${id}@appia.invalid`,
          name: "Deleted developer",
          vatNumber: null,
          passwordHash: null,
          isAdmin: false,
          verified: false,
          verifiedAt: null,
        },
      }),
      this.prisma.securityLog.create({
        data: {
          entityType: "DEVELOPER",
          entityId: id,
          action: "GDPR_ERASURE",
          severity: "WARNING",
          performedBy: "SYSTEM",
          metadata: { appsWithdrawn: true },
        },
      }),
    ]);
  }
}
