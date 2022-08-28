import { Test, TestingModule } from '@nestjs/testing';
import { DockerImagesService } from './docker-images.service';

describe('DockerImagesService', () => {
  let service: DockerImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerImagesService],
    }).compile();

    service = module.get<DockerImagesService>(DockerImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
