import { IsString, IsLowercase, IsObject} from 'class-validator';

export class CreateDockerImageDto {
    @IsString()
    @IsLowercase()
    name: string;

    @IsString()
    version: string;

    @IsString()
    @IsLowercase()
    repository: string;

    @IsObject()
    metadata: object;
}
