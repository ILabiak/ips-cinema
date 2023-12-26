import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.saveFileToDB(file);
  }

  @Get()
  findAll() {
    return this.filesService.findAllIds();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.deleteFileFromDB(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.filesService.getFile(id);
  }
}
