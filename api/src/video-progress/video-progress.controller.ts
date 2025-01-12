import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PathDto } from './dto/path.dto';
import { UpdateOrCreateVideoProgressDto } from './dto/update-or-create-video-progress.dto';
import { VideoProgressService } from './video-progress.service';

@Controller('video-progress')
export class VideoProgressController {
  constructor(private readonly videoProgressService: VideoProgressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrUpdate(
    @Body() updateOrCreateVideoProgressDto: UpdateOrCreateVideoProgressDto,
    @Req() { user }: Request,
  ) {
    return this.videoProgressService.createOrUpdate(
      updateOrCreateVideoProgressDto,
      user,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findByPath(@Query() { path }: PathDto, @Req() { user }: Request) {
    return this.videoProgressService.findByPath(path, user);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  getCurrent(@Req() { user }: Request, @Query() { path }: PathDto) {
    return this.videoProgressService.getCurrent(path, user);
  }
}
