import { PartialType } from '@nestjs/mapped-types';
import { CreateViewerDto } from './create-viewer.dto';
import { IsOptional } from 'class-validator';

export class UpdateViewerDto extends PartialType(CreateViewerDto) {
  @IsOptional()
  imageId: string;
}
