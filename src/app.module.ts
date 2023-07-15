import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripsModule } from './trips/trips.module';
import { SeederModule } from 'nestjs-sequelize-seeder';

@Module({
  exports: [DriversModule],
  imports: [
    DriversModule,
    TripsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true, // Solo para desarrollo, deshabilitar en producción
    }),
    SeederModule.forRoot({
      // Activate this if you want to run the seeders if the table is empty in the database
      runOnlyIfTableIsEmpty: true,
    }),
  ],
})
export class AppModule {}
