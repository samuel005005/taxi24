import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';

export default class GetNearbyDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(latitude: string, longitude: string) {
    return this.driverRepository.getNearbyDriver(latitude, longitude);
  }
}
