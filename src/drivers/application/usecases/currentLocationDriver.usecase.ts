import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import Driver from "src/drivers/domain/models/driver.model";


export default class CurrentLocationDriverUseCase {
  constructor(
    private readonly driverRepository: DriverRepository,
  ) { }

  public handler(idDriver: string, latitud: string, longitud: string) {
    this.driverRepository.currentLocationDriver(idDriver, latitud, longitud);
  }
}
