import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { UpdateOrCreateVideoProgressDto } from './dto/update-or-create-video-progress.dto';
import { VideoProgress } from './entities/video-progress.entity';

@Injectable()
export class VideoProgressService {
  constructor(
    @InjectRepository(VideoProgress)
    private readonly videoProgressRepository: Repository<VideoProgress>,
  ) {}
  async createOrUpdate(
    updateOrCreateVideoProgressDto: UpdateOrCreateVideoProgressDto,
    user: User,
  ) {
    const videoProgressByPath = await this.videoProgressRepository.findOne({
      where: { path: updateOrCreateVideoProgressDto.path, userId: user.id },
    });

    if (videoProgressByPath) {
      return this.videoProgressRepository.update(videoProgressByPath.id, {
        duration: updateOrCreateVideoProgressDto.duration,
        updatedAt: new Date(),
      });
    }

    return this.videoProgressRepository.save({
      ...updateOrCreateVideoProgressDto,
      user,
    });
  }

  findByPath(path: string, user: User) {
    return this.videoProgressRepository.findOne({
      where: { path, userId: user.id },
    });
  }

  getCurrent(parentPath: string, user: User) {
    return this.videoProgressRepository.findOne({
      where: { userId: user.id, path: Like(`${parentPath}%`) },
      order: { updatedAt: 'DESC' },
    });
  }

  getAll(user: User) {
    return this.videoProgressRepository.find({
      where: { userId: user.id },
      order: { updatedAt: 'DESC' },
    });
  }
}
