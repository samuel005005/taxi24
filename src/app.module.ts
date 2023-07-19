import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripsModule } from './trips/trips.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { PassagersModule } from './passengers/passagers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [DriversModule, InvoicesModule],
  imports: [
    DriversModule,
    TripsModule,
    PassagersModule,
    InvoicesModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true, // Solo para desarrollo, deshabilitar en producción
      }),
    }),
    SeederModule.forRoot({
      // Activate this if you want to run the seeders if the table is empty in the database
      runOnlyIfTableIsEmpty: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
