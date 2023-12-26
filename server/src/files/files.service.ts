import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from '../schema/image.schema';
import Jimp from 'jimp';

@Injectable()
export class FilesService {
  private allowedExtensions = ['jpeg', 'png', 'gif'];

  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<ImageDocument>,
  ) {}

  async saveFileToStorage(file: Express.Multer.File) {
    this.checkFileMimetype(file.mimetype);

    const fileId = uuid.v4();
    const filePath = path.resolve('static', `${fileId}.webp`);

    try {
      this.compressAndStore(file.buffer, fileId);
      await writeFile(filePath, file.buffer);
      return fileId;
    } catch (error) {
      console.error(error);
    }
  }

  compressAndStore(buffer: Buffer, fileId: string) {
    Jimp.read(buffer).then((image) => {
      const filePath = path.resolve('static', `${fileId}_small.webp`);
      image.quality(60).write(filePath);
    });
  }

  async deleteFileFromStorage(fileName: string) {
    const filePath = path.resolve('static', `${fileName}.webp`);
    const compressedFilePath = path.resolve('static', `${fileName}_small.webp`);
    try {
      unlink(filePath);
      unlink(compressedFilePath);
    } catch (error) {
      console.error(error);
    }
  }

  saveFileToDB(file: Express.Multer.File) {
    this.checkFileMimetype(file.mimetype);

    const image = new this.imageModel({
      name: file.originalname,
      image: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    return image.save();
  }

  checkFileMimetype(mimetype: string) {
    const subtype = mimetype.split('/').at(-1);

    if (!this.allowedExtensions.includes(subtype)) {
      throw new HttpException(
        'Unsupported media type. Only .jpeg, .png, .gif files are allowed.',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
  }

  findAllIds() {
    return this.imageModel.find().exec();
  }

  getFile(id: string) {
    return this.imageModel.findById(id);
  }

  async deleteFileFromDB(id: string) {
    return this.imageModel.findByIdAndDelete(id);
  }
}
