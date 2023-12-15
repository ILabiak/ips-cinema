import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ViewerDocument = Viewer & Document;

@Schema()
export class Viewer {
  @Prop()
  full_name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;
}

export const ViewerSchema = SchemaFactory.createForClass(Viewer);
