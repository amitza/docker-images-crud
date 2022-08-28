import { Test, TestingModule } from '@nestjs/testing';
import { DockerImagesController } from './docker-images.controller';
import { DockerImagesService } from './docker-images.service';

describe('DockerImagesController', () => {
  let controller: DockerImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DockerImagesController],
      providers: [DockerImagesService],
    }).compile();

    controller = module.get<DockerImagesController>(DockerImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
