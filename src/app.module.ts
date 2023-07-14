import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    DriversModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cosjiomd',
      password: 'hOJgixVj_D-1KzAS0ys9jtc2qkOMITZ1',
      database: 'taxi24',
      autoLoadModels: true,
      synchronize: true, // Solo para desarrollo, deshabilitar en producción
    }),
  ],
})
export class AppModule {}
