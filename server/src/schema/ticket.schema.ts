import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Film } from './film.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  date: string;

  @Prop()
  seat: number;

  @Prop()
  time: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Film' })
  film_id: Film;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
