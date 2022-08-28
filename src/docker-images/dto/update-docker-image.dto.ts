import { PartialType } from '@nestjs/mapped-types';
import { CreateDockerImageDto } from './create-docker-image.dto';

export class UpdateDockerImageDto extends PartialType(CreateDockerImageDto) {}
