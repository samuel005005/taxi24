import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';

export default class GetNearbyDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(location: LocationModel) {
    return this.driverRepository.getNearbyDriver(location);
  }
}
