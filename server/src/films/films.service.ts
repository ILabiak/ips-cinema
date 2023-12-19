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
      pictureId = await this.filesService.saveFileToStorage(file);
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

  async update(
    id: string,
    updateFilmDto: UpdateFilmDto,
    file: Express.Multer.File,
  ) {
    // eslint-disable-next-line prefer-const
    let { pictureId, ...updateFilmData } = updateFilmDto;

    if (!pictureId) {
      const film = await this.filmModel.findById(id);
      film.id;
      pictureId = film.pictureId;
    }

    if (file) {
      this.filesService.deleteFileFromStorage(pictureId);
      pictureId = await this.filesService.saveFileToStorage(file);
    }

    return this.filmModel.findByIdAndUpdate(id, {
      ...updateFilmData,
      pictureId,
    });
  }

  async remove(id: string) {
    const film = await this.filmModel.findById(id);
    this.filesService.deleteFileFromStorage(film.pictureId);
    return this.filmModel.findByIdAndDelete(id);
  }
}
