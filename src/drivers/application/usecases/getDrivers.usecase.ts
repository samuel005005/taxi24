import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import Driver from "src/drivers/domain/models/driver.model";


export default class GetDriversUseCase {
  constructor(
   private readonly driverRepository: DriverRepository,
  ) {}

  public handler(): Promise<Driver[]> {
    return this.driverRepository.findAll();
  }
}
