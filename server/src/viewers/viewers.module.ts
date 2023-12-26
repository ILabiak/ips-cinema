import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { Viewer, ViewerSchema } from '../schema/viewer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Viewer.name,
        schema: ViewerSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule {}
