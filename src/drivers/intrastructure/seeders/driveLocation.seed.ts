import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { DriverLocationEntity } from '../entities/locationDrive.entity';

@Seeder({
  model: DriverLocationEntity,
})
export class SeedDriverLocation implements OnSeederInit {
  run() {
    const data = [
      {
        driver: 1,
        latitude: 18.558807,
        longitude: -69.871641,
        status: 'A',
      },
      {
        driver: 2,
        latitude: 18.558807,
        longitude: -69.871641,
        status: 'A',
      },
    ];
    return data;
  }
}
