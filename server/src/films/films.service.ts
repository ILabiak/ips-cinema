import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../schema/film.schema';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
    private filesService: FilesService,
  ) {}

  async create(createFilmDto: CreateFilmDto, file: Express.Multer.File) {
    let pictureId: string;
    if (file) {
      pictureId = await this.filesService.saveImage(file);
    }
    const film = new this.filmModel({ ...createFilmDto, pictureId });
    return film.save();
  }

  findAll() {
    return this.filmModel.find().exec();
  }

  findOne(id: string) {
    return this.filmModel.findById(id);
  }

  update(id: string, updateFilmDto: UpdateFilmDto) {
    return this.filmModel.findByIdAndUpdate(id, updateFilmDto);
  }

  async remove(id: string) {
    const film = await this.filmModel.findById(id);
    this.filesService.deleteFile(film.pictureId);
    return this.filmModel.findByIdAndDelete(id);
  }
}
