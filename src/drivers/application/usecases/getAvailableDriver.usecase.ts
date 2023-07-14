import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import Driver from 'src/drivers/domain/models/driver.model';

export default class GetAvailableDriversUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(): Promise<Driver[]> {
    return this.driverRepository.getAvailableDrivers();
  }
}
