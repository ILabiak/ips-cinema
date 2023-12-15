import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  ticket_id: string;

  @IsString()
  @IsNotEmpty()
  viewer_id: string;
}
