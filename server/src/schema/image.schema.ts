import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  id: string;

  @Prop()
  name: string;

  @Prop({ type: Object })
  image: {
    data: BinaryData;
    contentType: string;
  };
}

export const ImageSchema = SchemaFactory.createForClass(Image);
