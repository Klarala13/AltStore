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
   * Cascades: anonymise apps, nullify developer relation, delete account.
   */
  async gdprErasure(id: string, requesterId: string): Promise<void> {
    if (id !== requesterId) throw new ForbiddenException();

    await this.prisma.$transaction([
      // Anonymise apps to preserve referential integrity
      this.prisma.app.updateMany({
        where: { developerId: id },
        data: { status: "REMOVED" },
      }),
      this.prisma.developer.delete({ where: { id } }),
    ]);
  }
}
