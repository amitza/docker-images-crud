import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerImagesModule } from './docker-images/docker-images.module';
import { DeploymentsModule } from './deployments/deployments.module';

@Module({
  imports: [
    DockerImagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: config.get<string>('DB_NAME'),
    })
  }), DeploymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
