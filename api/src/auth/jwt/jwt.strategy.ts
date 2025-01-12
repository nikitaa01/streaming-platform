import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/constants/env';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env.SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findOne(payload.userId);
      if (!user) {
        throw new HttpException('Unauthorized', 401);
      }
      return user;
    } catch {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
