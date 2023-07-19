import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { PassengerController } from './controllers/passengers.controller';
import { PassengerService } from './services/driver.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassengerEntity } from './entities/passenger.entity';
import { PassengerRepositoryPostgrest } from './repositories/passenger.repository';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedPassengerLocation } from './seeeders/passengers.seed';
@Module({
  providers: [
    PassengerService,
    { provide: 'PassengerRepository', useClass: PassengerRepositoryPostgrest },
  ],
  imports: [
    ApplicationModule,
    SequelizeModule.forFeature([PassengerEntity]),
    SeederModule.forFeature([SeedPassengerLocation]),
  ],
  controllers: [PassengerController],
  exports: [
    { provide: 'PassengerRepository', useClass: PassengerRepositoryPostgrest },
  ],
})
export class InfrastructureModule {}
