import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DockerImagesService } from './docker-images.service';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';

@Controller('docker-images')
export class DockerImagesController {
  constructor(private readonly dockerImagesService: DockerImagesService) {}

  @Post()
  create(@Body() createDockerImageDto: CreateDockerImageDto) {
    return this.dockerImagesService.create(createDockerImageDto);
  }

  @Get()
  findAll() {
    return this.dockerImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dockerImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDockerImageDto: UpdateDockerImageDto) {
    return this.dockerImagesService.update(+id, updateDockerImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dockerImagesService.remove(+id);
  }
}
