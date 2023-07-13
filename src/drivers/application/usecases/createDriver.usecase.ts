import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import Driver from "src/drivers/domain/models/driver.model";


export default class CreateDriverUseCase {
  constructor(
   private readonly driverRepository: DriverRepository,
  ) {}

  public handler(pokemon: Driver): Promise<Driver> {
    return this.driverRepository.create(pokemon);
  }
}
