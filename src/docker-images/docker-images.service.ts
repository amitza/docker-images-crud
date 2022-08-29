import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { k_combinations } from '../utils/combinations';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';
import { DockerImage, DockerImageDocument } from './entities/docker-image.entity';

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

  async findAll(pageNumber: number = 0, limit: number = 12): Promise<object> {
    const totalDockerImages = await this.dockerImageModel.countDocuments();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    const result = {
      totalDockerImages: totalDockerImages,
    };

    if (startIndex > 0) {
      result['previous'] = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }

    if (endIndex < totalDockerImages) {
      result['next'] = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    result['data'] = await this.dockerImageModel
      .find({})
      .sort({ updatedAt: 'descending' })
      .skip(startIndex)
      .limit(limit);
    result['rowsPerPage'] = limit;
    return result;
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
