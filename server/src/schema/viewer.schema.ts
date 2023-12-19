import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Image } from './image.schema';

export type ViewerDocument = Viewer & Document;

@Schema()
export class Viewer {
  @Prop()
  full_name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Image;
}

export const ViewerSchema = SchemaFactory.createForClass(Viewer);
