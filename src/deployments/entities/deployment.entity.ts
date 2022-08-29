import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DeploymentDocument = Deployment & Document;

@Schema()
export class Deployment {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DockerImage' })
  imageId: string;

  @Prop({ type: Date })
  createdAt: Date;
}

export const DeploymentSchema = SchemaFactory.createForClass(Deployment);