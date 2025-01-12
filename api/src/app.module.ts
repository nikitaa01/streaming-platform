import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { env } from './constants/env';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { VideoProgressModule } from './video-progress/video-progress.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    FileModule,
    VideoProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
