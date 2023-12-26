import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewersModule } from './viewers/viewers.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { SellersModule } from './sellers/sellers.module';
import { FilmsModule } from './films/films.module';
import { TicketsModule } from './tickets/tickets.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: 'qwerty334455',
      username: 'postgres',
      entities: [Order],
      database: 'cinema',
      synchronize: true,
      logging: true,
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/', { dbName: 'cinema' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ViewersModule,
    OrdersModule,
    SellersModule,
    FilmsModule,
    TicketsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
