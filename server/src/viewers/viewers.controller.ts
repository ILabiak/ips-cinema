import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createViewerDto: CreateViewerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.viewersService.create(createViewerDto, file);
  }

  @Get()
  findAll() {
    return this.viewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateViewerDto: UpdateViewerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.viewersService.update(id, updateViewerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewersService.remove(id);
  }
}
