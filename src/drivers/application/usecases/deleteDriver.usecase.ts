import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';

export default class DeleteDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public handler(term: string) {
    return this.driverRepository.remove(term);
  }
}
