import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { env } from 'src/constants/env';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    readonly userService: UserService,
    readonly jwtService: JwtService,
  ) {}
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    const foundUser = await this.userService.findOneByEmail(user.email);

    let userId = foundUser?.id;

    if (!foundUser) {
      const createdUser = await this.userService.create(user);
      userId = createdUser?.id;
    }

    if (!userId) {
      throw new HttpException('User not created', 400);
    }

    const jwt = this.jwtService.sign({ userId });

    res.cookie('Authentication', jwt, { httpOnly: true });

    return res.redirect(env.APP_URL);
  }
}
