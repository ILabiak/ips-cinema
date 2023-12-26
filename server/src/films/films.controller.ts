import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createFilmDto: CreateFilmDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmsService.create(createFilmDto, file);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmsService.update(id, updateFilmDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}
