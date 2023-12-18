import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  private allowedExtensions = ['jpeg', 'png', 'gif'];

  async saveImage(file: Express.Multer.File) {
    const subtype = file.mimetype.split('/').at(-1);

    if (!this.allowedExtensions.includes(subtype)) {
      throw new HttpException(
        'Unsupported media type. Only .jpeg, .png, .gif files are allowed.',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }

    const fileName = uuid.v4() + '.webp';
    const filePath = path.resolve('static', fileName);

    try {
      await writeFile(filePath, file.buffer);
      return fileName;
    } catch (error) {
      console.error(error);
    }
  }
}
