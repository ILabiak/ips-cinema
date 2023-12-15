import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewersModule } from './viewers/viewers.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { SellersModule } from './sellers/sellers.module';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'qwerty334455',
      username: 'postgres',
      entities: [Order],
      database: 'cinema',
      synchronize: true,
      logging: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/', { dbName: 'cinema' }),
    ViewersModule,
    OrdersModule,
    SellersModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
