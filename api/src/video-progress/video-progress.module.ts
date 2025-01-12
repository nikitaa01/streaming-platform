import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoProgress } from './entities/video-progress.entity';
import { VideoProgressController } from './video-progress.controller';
import { VideoProgressService } from './video-progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoProgress])],
  controllers: [VideoProgressController],
  providers: [VideoProgressService],
})
export class VideoProgressModule {}
