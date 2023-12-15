import { Injectable } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viewer, ViewerDocument } from '../schema/viewer.schema';

@Injectable()
export class ViewersService {
  constructor(
    @InjectModel(Viewer.name)
    private readonly viewerModel: Model<ViewerDocument>,
  ) {}

  create(createViewerDto: CreateViewerDto) {
    const viewer = new this.viewerModel(createViewerDto);
    return viewer.save();
  }

  findAll() {
    return this.viewerModel.find().exec();
  }

  findOne(id: string) {
    return this.viewerModel.findById(id);
  }

  update(id: string, updateViewerDto: UpdateViewerDto) {
    return this.viewerModel.findByIdAndUpdate(id, updateViewerDto);
  }

  remove(id: string) {
    return this.viewerModel.findByIdAndDelete(id);
  }
}
