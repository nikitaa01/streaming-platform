import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'src/constants/env';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github/github.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: env.SECRET,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, UserService, JwtStrategy],
})
export class AuthModule {}
