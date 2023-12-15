import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../schema/film.schema';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  create(createFilmDto: CreateFilmDto) {
    const film = new this.filmModel(createFilmDto);
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

  remove(id: string) {
    return this.filmModel.findByIdAndDelete(id);
  }
}
