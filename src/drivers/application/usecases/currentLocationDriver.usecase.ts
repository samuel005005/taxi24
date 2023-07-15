import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';

export default class CurrentLocationDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(idDriver: string, location: LocationModel) {
    return this.driverRepository.currentLocationDriver(idDriver, location);
  }
}
