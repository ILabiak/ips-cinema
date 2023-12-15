import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  ticket_id: string;

  @Column({ type: 'text' })
  viewer_id: string;
}
