import { PartialType } from '@nestjs/mapped-types';
import { CreateDockerImageDto } from './create-docker-image.dto';
import { IsDate } from 'class-validator';


export class UpdateDockerImageDto extends PartialType(CreateDockerImageDto) {
    
    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
