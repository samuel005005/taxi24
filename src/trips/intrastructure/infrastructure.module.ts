import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { SequelizeModule } from '@nestjs/sequelize';
import TripEntity from './entities/trip.entity';
@Module({
  providers: [],
  imports: [ApplicationModule,
    SequelizeModule.forFeature([TripEntity]),],
  controllers: [],
})
export class InfrastructureModule { }
