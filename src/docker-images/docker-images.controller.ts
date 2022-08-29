import { CollectionDto, ValidationPipe } from '@forlagshuset/nestjs-mongoose-paginate';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DockerImagesService } from './docker-images.service';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';
import { DockerImagesCollectionProperties } from './entities/docker-images.collection';

@Controller('docker-images')
export class DockerImagesController {
  constructor(private readonly dockerImagesService: DockerImagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Body() createDockerImageDto: CreateDockerImageDto) {
    return this.dockerImagesService.create(createDockerImageDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAll(@Query(new ValidationPipe(DockerImagesCollectionProperties)) collectionDto: CollectionDto) {
    return this.dockerImagesService.findAll(collectionDto);
  }

  @Get('combinations/:length')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getCombinations(@Param('length') length: number) {
    return this.dockerImagesService.getCombinations(length);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.dockerImagesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDockerImageDto: UpdateDockerImageDto) {
    return this.dockerImagesService.update(id, updateDockerImageDto);
  }
}
