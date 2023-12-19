import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { IsOptional } from 'class-validator';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @IsOptional()
  pictureId: string;
}
