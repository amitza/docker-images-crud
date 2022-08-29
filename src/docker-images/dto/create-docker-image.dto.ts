import { IsString, IsLowercase, IsObject} from 'class-validator';

export class CreateDockerImageDto {
    @IsString()
    @IsLowercase()
    name: string;

    @IsString()
    version: string;

    @IsLowercase()
    repositopry: string;

    @IsObject()
    metadata: object;
}
