import { Module } from '@nestjs/common';
import { DockerImagesService } from './docker-images.service';
import { DockerImagesController } from './docker-images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DockerImage, DockerImageSchema } from './entities/docker-image.entity';

@Module({
  imports: [ MongooseModule.forFeature([{ name: DockerImage.name, schema: DockerImageSchema }])],
  controllers: [DockerImagesController],
  providers: [DockerImagesService]
})
export class DockerImagesModule {}
