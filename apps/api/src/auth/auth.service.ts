import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDeveloperDto } from "./auth.dto";
import { JwtPayload } from "./jwt.strategy";
import * as bcrypt from "bcrypt";

const BCRYPT_ROUNDS = 12;

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

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const developer = await this.prisma.developer.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        type: dto.type,
        country: dto.country,
        vatNumber: dto.vatNumber ?? null,
      },
    });

    const payload: JwtPayload = { sub: developer.id, email: developer.email };
    return { accessToken: this.jwt.sign(payload) };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const developer = await this.prisma.developer.findUnique({
      where: { email: dto.email },
    });

    if (!developer) {
      // Constant-time rejection to prevent user enumeration
      await bcrypt.hash("dummy", BCRYPT_ROUNDS);
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!developer.passwordHash) {
      // Account registered via OAuth — cannot log in with password
      throw new BadRequestException(
        "This account was created via social login. Please use the corresponding provider."
      );
    }

    const passwordValid = await bcrypt.compare(dto.password, developer.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = { sub: developer.id, email: developer.email };
    return { accessToken: this.jwt.sign(payload) };
  }
}
