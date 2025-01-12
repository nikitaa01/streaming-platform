import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { env } from 'src/constants/env';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${env.APP_URL}/api/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { username, emails, photos, name } = profile;

    const user: CreateUserDto = {
      avatar: photos[0].value,
      email: emails[0].value,
      name: name?.givenName,
      last_name: name?.familyName,
      username: username,
    };

    return user;
  }
}
