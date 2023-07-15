import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripEntity } from './entities/trip.entity';
import { TripController } from './controllers/trips.controller';
import { TripService } from './services/trip.service';
import { TripRepositoryPostgrest } from './repositories/trip.repository';
@Module({
  providers: [
    TripService,
    { provide: 'TripRepository', useClass: TripRepositoryPostgrest },
  ],
  imports: [ApplicationModule, SequelizeModule.forFeature([TripEntity])],
  controllers: [TripController],
})
export class InfrastructureModule {}
