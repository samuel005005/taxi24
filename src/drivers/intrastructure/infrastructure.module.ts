import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { DriverController } from './controllers/driver.controller';
import { DriverService } from './services/driver.service';
import { DriverRepositoryPostgrest } from './repositories/driver.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { DriverEntity } from './entities/driver.entity';
import { DriverLocationEntity } from './entities/locationDrive.entity';
@Module({
  providers: [
    DriverService,
    { provide: 'DriverRepository', useClass: DriverRepositoryPostgrest },
  ],
  imports: [
    ApplicationModule,
    SequelizeModule.forFeature([DriverEntity, DriverLocationEntity]), 
  ],
  controllers: [DriverController],
})
export class InfrastructureModule {}
