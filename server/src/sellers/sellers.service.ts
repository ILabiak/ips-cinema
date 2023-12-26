import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from '../schema/seller.schema';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
  ) {}

  create(createSellerDto: CreateSellerDto) {
    const seller = new this.sellerModel(createSellerDto);
    return seller.save();
  }

  findAll() {
    return this.sellerModel.find().exec();
  }

  findOne(id: string) {
    return this.sellerModel.findById(id);
  }

  update(id: string, updateViewerDto: UpdateSellerDto) {
    return this.sellerModel.findByIdAndUpdate(id, updateViewerDto);
  }

  remove(id: string) {
    return this.sellerModel.findByIdAndDelete(id);
  }
}
