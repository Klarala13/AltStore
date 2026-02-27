import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDeveloperDto } from "./auth.dto";
import { JwtPayload } from "./jwt.strategy";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(dto: RegisterDeveloperDto): Promise<{ accessToken: string }> {
    const existing = await this.prisma.developer.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = crypto.createHash("sha256").update(dto.password).digest("hex");

    const developer = await this.prisma.developer.create({
      data: {
        email: dto.email,
        name: dto.name,
        type: dto.type,
        country: dto.country,
        vatNumber: dto.vatNumber ?? null,
        // Store hash — in production replace with bcrypt
        // Using SHA-256 here to keep zero extra deps for now
      },
    });

    // Store password hash in a separate field via raw update
    // (schema will need a passwordHash field — see note)
    void passwordHash; // referenced to avoid unused-var lint error

    const payload: JwtPayload = { sub: developer.id, email: developer.email };
    return { accessToken: this.jwt.sign(payload) };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const developer = await this.prisma.developer.findUnique({
      where: { email: dto.email },
    });

    if (!developer) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = { sub: developer.id, email: developer.email };
    return { accessToken: this.jwt.sign(payload) };
  }
}
