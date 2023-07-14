import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    DriversModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true, // Solo para desarrollo, deshabilitar en producción
    }),
  ],
})
export class AppModule {}
