import { CollectionDto, ValidationPipe } from '@forlagshuset/nestjs-mongoose-paginate';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { DeploymentsCollectionProperties } from './entities/deployment.collection';

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService,
    private readonly configService: ConfigService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Body() createDeploymentDto: CreateDeploymentDto) {
    return this.deploymentsService.create(createDeploymentDto, this.configService.get<string>('COUNT_FILE_NAME'));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  findAll(@Query(new ValidationPipe(DeploymentsCollectionProperties)) collectionDto: CollectionDto) {
    return this.deploymentsService.findAll(collectionDto);
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  count() {
    return this.deploymentsService.count(this.configService.get<string>('COUNT_FILE_NAME'));
  }
}
