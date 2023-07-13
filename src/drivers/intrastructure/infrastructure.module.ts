import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { DriverController } from './controllers/driver.controller';
import { DriverService } from './services/driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverEntity, DriverSchema } from './entities/driver.entity';
import { DriverRepositoryMongo } from './repositories/driver.repository';
import { DriverLocationEntity, DriverLocationSchema } from './entities/locationDrive.entity';
@Module({
    providers: [
        DriverService,
        { provide: 'DriverRepository', useClass: DriverRepositoryMongo },
    ],
    imports: [
        ApplicationModule,
        MongooseModule.forFeature([
            {
                name: DriverEntity.name,
                schema: DriverSchema,
            },
            {
                name: DriverLocationEntity.name,
                schema: DriverLocationSchema,
            }
        ]),
    ],
    controllers: [
        DriverController
    ],
})
export class InfrastructureModule { }
