import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerImagesModule } from './docker-images/docker-images.module';

@Module({
  imports: [DockerImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
