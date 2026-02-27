import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { DevelopersService } from "./developers.service";
import { UpdateDeveloperDto } from "./developers.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/jwt.strategy";

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Controller("developers")
@UseGuards(JwtAuthGuard)
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get("me")
  getMe(@Request() req: AuthRequest) {
    return this.developersService.findById(req.user.sub);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.developersService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDeveloperDto, @Request() req: AuthRequest) {
    return this.developersService.update(id, req.user.sub, dto);
  }

  @Delete(":id/gdpr-erasure")
  @HttpCode(HttpStatus.NO_CONTENT)
  gdprErasure(@Param("id") id: string, @Request() req: AuthRequest) {
    return this.developersService.gdprErasure(id, req.user.sub);
  }
}
