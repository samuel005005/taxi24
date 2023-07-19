import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { PassengerEntity } from '../entities/passenger.entity';

@Seeder({
  model: PassengerEntity,
})
export class SeedPassengerLocation implements OnSeederInit {
  run() {
    const data = [
      {
        name: 'Samuel',
        lastName: 'Perez',
        phoneNumber: '8094040896',
        identificationCard: '40223915089',
        available: true,
        status: 'A',
      },
      {
        name: 'Manuel',
        lastName: 'Rodriguez',
        phoneNumber: '8094020896',
        identificationCard: '40223913089',
        available: true,
        status: 'A',
      },
      {
        name: 'Joselito',
        lastName: 'Paez',
        phoneNumber: '8094020896',
        identificationCard: '40226913089',
        available: true,
        status: 'A',
      },
    ];
    return data;
  }
}
