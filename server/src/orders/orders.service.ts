import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Ticket, TicketDocument } from '../schema/ticket.schema';
import { Viewer, ViewerDocument } from '../schema/viewer.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @InjectModel(Viewer.name)
    private readonly viewerModel: Model<ViewerDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order: Order = new Order();
    if (
      !createOrderDto?.ticket_id.match(/^[0-9a-fA-F]{24}$/) ||
      !createOrderDto?.viewer_id.match(/^[0-9a-fA-F]{24}$/)
    ) {
      throw new NotFoundException('Not valid ticket_id or viewer_id');
    }
    const ticket = await this.ticketModel.findById(createOrderDto.ticket_id);
    // console.log(ticket);
    if (ticket == null) {
      throw new NotFoundException('Ticket not found');
    }
    const viewer = await this.viewerModel.findById(createOrderDto.viewer_id);
    if (viewer == null) {
      throw new NotFoundException('Viewer not found');
    }
    order.ticket_id = createOrderDto.ticket_id;
    order.viewer_id = createOrderDto.viewer_id;
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    console.log(order);
    const ticket = await this.ticketModel.findById(order.ticket_id);
    if (ticket == null) {
      throw new NotFoundException('Ticket not found');
    }
    const viewer = await this.viewerModel.findById(order.viewer_id);
    if (viewer == null) {
      throw new NotFoundException('Viewer not found');
    }
    // console.log(ticket, viewer);
    return { order, ticket, viewer };
    // return this.orderRepository.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const order: Order = new Order();
    order.ticket_id = updateOrderDto.ticket_id;
    order.viewer_id = updateOrderDto.viewer_id;
    order.id = id;
    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
