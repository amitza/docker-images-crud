import { Module } from '@nestjs/common';
import { DockerImagesService } from './docker-images.service';
import { DockerImagesController } from './docker-images.controller';

@Module({
  controllers: [DockerImagesController],
  providers: [DockerImagesService]
})
export class DockerImagesModule {}
