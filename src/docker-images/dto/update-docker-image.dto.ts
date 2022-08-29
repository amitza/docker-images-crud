import { PartialType } from '@nestjs/mapped-types';
import { CreateDockerImageDto } from './create-docker-image.dto';
import { IsDate, IsNotEmpty } from 'class-validator';


export class UpdateDockerImageDto extends PartialType(CreateDockerImageDto) {
    
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}
