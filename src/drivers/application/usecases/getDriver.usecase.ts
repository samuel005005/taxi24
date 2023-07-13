import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import Driver from "src/drivers/domain/models/driver.model";


export default class GetDriverUseCase {
  constructor(
    private readonly driverRepository: DriverRepository,
  ) { }

  public handler(term: string): Promise<Driver> {
    return this.driverRepository.findOne(term);
  }
}
