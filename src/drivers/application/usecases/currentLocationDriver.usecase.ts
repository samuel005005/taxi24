import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';

export default class CurrentLocationDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(idDriver: string, latitude: string, longitude: string) {
    return this.driverRepository.currentLocationDriver(
      idDriver,
      latitude,
      longitude,
    );
  }
}
