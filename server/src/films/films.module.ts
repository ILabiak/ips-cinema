import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from '../schema/film.schema';
import { FilesModule } from '../files/files.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
