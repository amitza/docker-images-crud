import { CollectionDto, CollectionResponse, DocumentCollector } from '@forlagshuset/nestjs-mongoose-paginate';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { readFile } from 'node:fs/promises';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { Deployment, DeploymentDocument } from './entities/deployment.entity';

@Injectable()
export class DeploymentsService {
  constructor(
    @InjectModel(Deployment.name)
    private deploymentModel: Model<DeploymentDocument>
  ) {}

  async create(createDeploymentDto: CreateDeploymentDto): Promise<Deployment> {
    const deployemnt = new this.deploymentModel(createDeploymentDto);

    const count = Number(await readFile('count.txt', 'utf8'));
    
    var writeFileAtomic = require('write-file-atomic')

    await writeFileAtomic('count.txt', count + 1);

    deployemnt.createdAt = new Date();

    return deployemnt;
  }

  async findAll(collectionDto: CollectionDto): Promise<CollectionResponse<DeploymentDocument>> {
    const collector = new DocumentCollector<DeploymentDocument>(this.deploymentModel);
    return collector.find(collectionDto);
  }

  async count(): Promise<Number>{
    return Number(await readFile('count.txt', 'utf8'));
  }
}
