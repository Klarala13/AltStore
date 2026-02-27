import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { DownloadsService } from "./downloads.service";
import { RequestDownloadDto } from "./downloads.dto";

@Controller("downloads")
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  /**
   * POST /downloads/request
   * Accepts { versionId, userId? } and returns { signedUrl, qrCode }
   */
  @Post("request")
  requestDownload(@Body() dto: RequestDownloadDto, @Req() req: Request) {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
      req.socket.remoteAddress ??
      "unknown";

    const userAgent = req.headers["user-agent"] ?? "unknown";
    const country = req.headers["cf-ipcountry"] as string | undefined;

    return this.downloadsService.requestDownload(dto, ip, userAgent, country);
  }
}
