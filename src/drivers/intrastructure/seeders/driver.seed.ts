import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { DriverEntity } from '../entities/driver.entity';

@Seeder({
  model: DriverEntity,
  unique: ['driverLicense'],
})
export class SeedDriver implements OnSeederInit {
  run() {
    const data = [
      {
        name: 'Admin',
        lastName: 'Perez',
        phoneNumber: '8094040896',
        driverLicense: '40223915089',
        available: true,
        status: 'A',
      },
      {
        name: 'Jose',
        lastName: 'Perez',
        phoneNumber: '8094040896',
        driverLicense: '40223915029',
        available: true,
        status: 'A',
      },
      {
        name: 'Maria',
        lastName: 'Perez',
        phoneNumber: '8094040896',
        driverLicense: '40223115029',
        available: false,
        status: 'A',
      },
      {
        name: 'Pedro',
        lastName: 'Perez',
        phoneNumber: '8094040896',
        driverLicense: '40223912029',
        available: true,
        status: 'A',
      },
    ];
    return data;
  }
}
