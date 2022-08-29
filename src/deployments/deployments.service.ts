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

  async create(createDeploymentDto: CreateDeploymentDto, countFileName: string): Promise<Deployment> {
    const deployemnt = new this.deploymentModel(createDeploymentDto);

    const count = Number(await readFile(countFileName, 'utf8'));
    
    var writeFileAtomic = require('write-file-atomic')

    await writeFileAtomic(countFileName, count + 1);

    deployemnt.createdAt = new Date();

    return await deployemnt.save();
  }

  async findAll(collectionDto: CollectionDto): Promise<CollectionResponse<DeploymentDocument>> {
    const collector = new DocumentCollector<DeploymentDocument>(this.deploymentModel);
    return collector.find(collectionDto);
  }

  async count(countFileName: string): Promise<Number>{
    return Number(await readFile(countFileName, 'utf8'));
  }
}
