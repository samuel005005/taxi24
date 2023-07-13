import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
@Module({
    providers: [],
    imports: [
        ApplicationModule,
    ],
    controllers: [],
})
export class InfrastructureModule { }
