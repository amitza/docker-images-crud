import { Injectable } from '@nestjs/common';
import { CreateDockerImageDto } from './dto/create-docker-image.dto';
import { UpdateDockerImageDto } from './dto/update-docker-image.dto';

@Injectable()
export class DockerImagesService {
  create(createDockerImageDto: CreateDockerImageDto) {
    return 'This action adds a new dockerImage';
  }

  findAll() {
    return `This action returns all dockerImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dockerImage`;
  }

  update(id: number, updateDockerImageDto: UpdateDockerImageDto) {
    return `This action updates a #${id} dockerImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} dockerImage`;
  }
}
