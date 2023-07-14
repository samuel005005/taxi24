import { Sequelize } from 'sequelize-typescript';
import { DriverEntity } from 'src/drivers/intrastructure/entities/driver.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'alquilerrd-66aad:us-east1:taxi24',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([DriverEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
