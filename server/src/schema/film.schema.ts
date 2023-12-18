import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  director: string;

  @Prop()
  year: number;

  @Prop()
  description: string;

  @Prop()
  pictureId: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
