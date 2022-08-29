import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { DockerImagesService } from './docker-images.service';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';

@Controller('docker-images')
export class DockerImagesController {
  constructor(private readonly dockerImagesService: DockerImagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDockerImageDto: CreateDockerImageDto) {
    return this.dockerImagesService.create(createDockerImageDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('pageNumber') pageNumber, @Query('limit') limit) {
    return this.dockerImagesService.findAll(pageNumber, limit);
  }

  @Get('combinations/:length')
  @HttpCode(HttpStatus.OK)
  getCombinations(@Param('length') length: number) {
    return this.dockerImagesService.getCombinations(length);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.dockerImagesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateDockerImageDto: UpdateDockerImageDto) {
    return this.dockerImagesService.update(id, updateDockerImageDto);
  }
}