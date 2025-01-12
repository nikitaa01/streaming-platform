import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PathDto } from './dto/path.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFile(
    @Query() { path }: PathDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const file = await this.fileService.getFile(path, req.user);
    return res.json(file);
  }

  @Get('video-play')
  @UseGuards(JwtAuthGuard)
  async getVideoChunk(
    @Query() { path }: PathDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.fileService.getVideoChunk(path, res, req);
  }
}
