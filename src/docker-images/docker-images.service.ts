import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { k_combinations } from '../utils/combinations';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';
import { DockerImage, DockerImageDocument } from './entities/docker-image.entity';
import { CollectionDto, DocumentCollector, CollectionResponse } from '@forlagshuset/nestjs-mongoose-paginate';

@Injectable()
export class DockerImagesService {
  constructor(
    @InjectModel(DockerImage.name)
    private dockerImageModel: Model<DockerImageDocument>
  ) {}

  async create(
    createDockerImageDto: CreateDockerImageDto,
  ): Promise<DockerImage> {
    const createdImage = new this.dockerImageModel(createDockerImageDto);
    createdImage.createdAt = new Date();
    createdImage.updatedAt = new Date();
    return await createdImage.save();
  }

  async findAll(collectionDto: CollectionDto): Promise<CollectionResponse<DockerImageDocument>> {
    const collector = new DocumentCollector<DockerImageDocument>(this.dockerImageModel);
    return collector.find(collectionDto);
  }

  async findOne(id: string): Promise<DockerImage> {
    return await this.dockerImageModel.findById(id);
  }

  async getCombinations(length: number): Promise<string[]> {
    const dockerImagesNames = (await (await this.dockerImageModel.find({}).select('name -_id')).flatMap(e => e.name)) as string[];
    return k_combinations(dockerImagesNames, length);;
  }

  async update(id: string, updateDockerImageDto: UpdateDockerImageDto): Promise<DockerImage> {
      const originalImage = await this.dockerImageModel.findById(id);

      updateDockerImageDto.updatedAt = new Date();

      Object.assign(originalImage.metadata, updateDockerImageDto.metadata);

      const newDockerImage = new this.dockerImageModel(updateDockerImageDto);

      return await newDockerImage.save();
  }
}
