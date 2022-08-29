import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DockerImageDocument = DockerImage & Document;

@Schema()
export class DockerImage {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true, lowercase: true })
  repository: string;

  @Prop({ type: Object })
  metadata: object;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const DockerImageSchema = SchemaFactory.createForClass(DockerImage);