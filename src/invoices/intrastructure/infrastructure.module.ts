import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceController } from './controllers/invoice.controller';
import { DriversModule } from 'src/drivers/drivers.module';
import { PassagersModule } from 'src/passengers/passagers.module';
import { InvoceRepositoryPostgrest } from './repositories/invoice.repository';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceService } from './services/invoice.service';
@Module({
  providers: [
    InvoiceService,
    { provide: 'InvoiceRepository', useClass: InvoceRepositoryPostgrest },
  ],
  imports: [
    ApplicationModule,
    SequelizeModule.forFeature([InvoiceEntity]),
    DriversModule,
    PassagersModule,
  ],
  controllers: [InvoiceController],
  exports: [
    { provide: 'InvoiceRepository', useClass: InvoceRepositoryPostgrest },
  ],
})
export class InfrastructureModule {}
