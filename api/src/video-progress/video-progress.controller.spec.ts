import { Test, TestingModule } from '@nestjs/testing';
import { VideoProgressController } from './video-progress.controller';
import { VideoProgressService } from './video-progress.service';

describe('VideoProgressController', () => {
  let controller: VideoProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoProgressController],
      providers: [VideoProgressService],
    }).compile();

    controller = module.get<VideoProgressController>(VideoProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
