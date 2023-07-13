import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './intrastructure/infrastructure.module';


@Module({
  imports: [
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ]
})
export class DriversModule { }
