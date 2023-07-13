import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://samuel005005:os5MZaymFjqsPIsX@cluster0.jfpach4.mongodb.net/?retryWrites=true&w=majority',
    ),
    DriversModule,
  ],
})
export class AppModule {}
