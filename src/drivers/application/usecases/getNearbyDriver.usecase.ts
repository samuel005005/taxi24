import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';

export default class GetNearbyDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(location: LocationModel, distance?: number, limit?: number) {
    return this.driverRepository.getNearbyDriver(location, distance, limit);
  }
}
