import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripEntity } from './entities/trip.entity';
import { TripController } from './controllers/trips.controller';
import { TripService } from './services/trip.service';
import { TripRepositoryPostgrest } from './repositories/trip.repository';
import { DriversModule } from 'src/drivers/drivers.module';
import { PassagersModule } from 'src/passengers/passagers.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
@Module({
  providers: [
    TripService,
    { provide: 'TripRepository', useClass: TripRepositoryPostgrest },
  ],
  imports: [
    ApplicationModule,
    SequelizeModule.forFeature([TripEntity]),
    DriversModule,
    PassagersModule,
    InvoicesModule,
  ],
  controllers: [TripController],
  exports: [],
})
export class InfrastructureModule {}
