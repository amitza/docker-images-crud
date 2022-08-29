import { CollectionDto, ValidationPipe } from '@forlagshuset/nestjs-mongoose-paginate';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { DeploymentsCollectionProperties } from './entities/deployment.collection';

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService,
    private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createDeploymentDto: CreateDeploymentDto) {
    return this.deploymentsService.create(createDeploymentDto, this.configService.get<string>('COUNT_FILE_NAME'));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query(new ValidationPipe(DeploymentsCollectionProperties)) collectionDto: CollectionDto) {
    return this.deploymentsService.findAll(collectionDto);
  }

  @Get('count')
  count() {
    return this.deploymentsService.count(this.configService.get<string>('COUNT_FILE_NAME'));
  }
}
