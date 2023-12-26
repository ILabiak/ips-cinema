import { Injectable } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viewer, ViewerDocument } from '../schema/viewer.schema';
import { FilesService } from 'src/files/files.service';
import { Image } from 'src/schema/image.schema';

@Injectable()
export class ViewersService {
  constructor(
    @InjectModel(Viewer.name)
    private readonly viewerModel: Model<ViewerDocument>,
    private filesService: FilesService,
  ) {}

  async create(createViewerDto: CreateViewerDto, file: Express.Multer.File) {
    let image: Image;
    if (file) {
      image = await this.filesService.saveFileToDB(file);
    }
    const viewer = new this.viewerModel({ ...createViewerDto, image });
    console.log(viewer);
    return viewer.save();
  }

  findAll() {
    return this.viewerModel.find().populate('image').exec();
  }

  findOne(id: string) {
    return this.viewerModel.findById(id);
  }

  async update(
    id: string,
    updateViewerDto: UpdateViewerDto,
    file: Express.Multer.File,
  ) {
    const { imageId, ...updateViewerData } = updateViewerDto;

    if (file) {
      const { image: oldImage } = await this.viewerModel.findById(id);

      const image = await this.filesService.saveFileToDB(file);
      const updatedViewer = this.viewerModel.findByIdAndUpdate(id, {
        ...updateViewerData,
        image,
      });
      if (oldImage && oldImage.id)
        this.filesService.deleteFileFromDB(oldImage.id);
      return updatedViewer;
    }

    if (!imageId) {
      const { image: oldImage } = await this.viewerModel.findById(id);

      const updatedViewer = this.viewerModel.findByIdAndUpdate(id, {
        ...updateViewerData,
      });
      if (oldImage && oldImage.id)
        this.filesService.deleteFileFromDB(oldImage.id);
      return updatedViewer;
    }

    return this.viewerModel.findByIdAndUpdate(id, updateViewerData);
  }

  async remove(id: string) {
    const viewer = await this.viewerModel.findById(id);
    this.filesService.deleteFileFromDB(viewer.image.id);
    return this.viewerModel.findByIdAndDelete(id);
  }
}
