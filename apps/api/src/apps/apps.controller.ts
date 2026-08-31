import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AppsService, AppFilters, SearchFilters } from "./apps.service";
import { CreateAppDto, UpdateAppDto } from "./apps.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/jwt.strategy";
import { Category, Platform } from "@altstore/db";

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Controller("apps")
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  findAll(
    @Query("category") category?: Category,
    @Query("platform") platform?: Platform,
    @Query("page") page = "1",
    @Query("limit") limit = "20"
  ) {
    const filters: AppFilters = {
      category,
      platform,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    return this.appsService.findAll(filters);
  }

  /** GET /apps/search?q=&category=&platform=&page=&limit= — public full-text search */
  @Get("search")
  search(
    @Query("q") q = "",
    @Query("category") category?: Category,
    @Query("platform") platform?: Platform,
    @Query("page") page = "1",
    @Query("limit") limit = "20"
  ) {
    const filters: SearchFilters = {
      q,
      category,
      platform,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    return this.appsService.search(filters);
  }

  /**
   * GET /apps/mine?page=&limit= — the authenticated developer's own apps.
   *
   * Must stay declared before @Get(":slug") or Nest would match "mine" as a slug.
   */
  @Get("mine")
  @UseGuards(JwtAuthGuard)
  findMine(@Request() req: AuthRequest, @Query("page") page = "1", @Query("limit") limit = "20") {
    return this.appsService.findByDeveloper(req.user.sub, parseInt(page, 10), parseInt(limit, 10));
  }

  /** GET /apps/mine/:appId — one owned app by id, with every version. */
  @Get("mine/:appId")
  @UseGuards(JwtAuthGuard)
  findMineOne(@Param("appId") appId: string, @Request() req: AuthRequest) {
    return this.appsService.findOwnedById(appId, req.user.sub);
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.appsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAppDto, @Request() req: AuthRequest) {
    return this.appsService.create(req.user.sub, dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateAppDto, @Request() req: AuthRequest) {
    return this.appsService.update(id, req.user.sub, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id") id: string, @Request() req: AuthRequest) {
    return this.appsService.delete(id, req.user.sub);
  }
}
