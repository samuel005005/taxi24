import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import Driver from 'src/drivers/domain/models/driver.model';

export default class UpdateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(term: string, driver: Driver): Promise<Driver | null> {
    return this.driverRepository.update(term, driver);
  }
}
