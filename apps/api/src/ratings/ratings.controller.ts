import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from "@nestjs/common";
import { RatingsService } from "./ratings.service";
import { UpsertRatingDto } from "./ratings.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/jwt.strategy";

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Controller("apps/:slug/ratings")
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  /** GET /apps/:slug/ratings?page=1&limit=20 — public */
  @Get()
  findByApp(@Param("slug") slug: string, @Query("page") page = "1", @Query("limit") limit = "20") {
    return this.ratingsService.findByApp(slug, parseInt(page, 10), parseInt(limit, 10));
  }

  /** POST /apps/:slug/ratings — authenticated consumer upserts their rating */
  @Post()
  @UseGuards(JwtAuthGuard)
  upsert(@Param("slug") slug: string, @Body() dto: UpsertRatingDto, @Request() req: AuthRequest) {
    return this.ratingsService.upsert(slug, req.user.sub, dto);
  }
}
