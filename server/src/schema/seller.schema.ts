import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop()
  full_name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
