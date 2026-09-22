import { ConflictException, ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { AppsService } from "../apps/apps.service";
import { SubmitAppDto } from "./submissions.dto";

/** Marks a token as good only for finishing one submission, never for the API at large. */
const SUBMISSION_PURPOSE = "app-submission";

const UPLOAD_TOKEN_TTL = "2h";

interface UploadTokenPayload {
  sub: string;
  appId: string;
  purpose: string;
}

@Injectable()
export class SubmissionsService {
  private readonly logger = new Logger(SubmissionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly appsService: AppsService
  ) {}

  async submit(dto: SubmitAppDto) {
    const { submitterEmail, submitterName, submitterType, submitterCountry, ...appFields } = dto;
    const email = submitterEmail.toLowerCase();

    const existing = await this.prisma.developer.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    // Anyone can type anyone's address, so an email that already owns a real
    // account must not receive apps this way — that would let a stranger publish
    // under someone else's name.
    if (existing?.passwordHash) {
      throw new ConflictException(
        "That email already has an account. Sign in to submit an app under it."
      );
    }

    const developer =
      existing ??
      (await this.prisma.developer.create({
        data: {
          email,
          name: submitterName,
          type: submitterType,
          country: submitterCountry.toUpperCase(),
        },
      }));

    const app = await this.appsService.create(developer.id, appFields);

    const uploadToken = await this.jwt.signAsync(
      { sub: developer.id, appId: app.id, purpose: SUBMISSION_PURPOSE },
      { expiresIn: UPLOAD_TOKEN_TTL }
    );

    this.logger.log(`Anonymous submission: app ${app.slug} (${app.id})`);

    return {
      appId: app.id,
      slug: app.slug,
      status: app.status,
      uploadToken,
    };
  }

  /** Returns the developer this token may upload for, or throws. */
  async resolveUploadToken(token: string | undefined, appId: string): Promise<string> {
    if (!token) throw new ForbiddenException("Missing upload token");

    let payload: UploadTokenPayload;
    try {
      payload = await this.jwt.verifyAsync<UploadTokenPayload>(token);
    } catch {
      throw new ForbiddenException("Upload token expired. Submit the app again.");
    }

    if (payload.purpose !== SUBMISSION_PURPOSE || payload.appId !== appId) {
      throw new ForbiddenException("Upload token does not match this app");
    }

    return payload.sub;
  }
}
