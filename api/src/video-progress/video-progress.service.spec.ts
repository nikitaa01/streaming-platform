import { Test, TestingModule } from '@nestjs/testing';
import { VideoProgressService } from './video-progress.service';

describe('VideoProgressService', () => {
  let service: VideoProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoProgressService],
    }).compile();

    service = module.get<VideoProgressService>(VideoProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
