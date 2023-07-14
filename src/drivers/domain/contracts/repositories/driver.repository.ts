import Driver from '../../models/driver.model';

export interface DriverRepository {
  create(driver: Driver): Promise<Driver>;
  findAll(): Promise<Driver[]>;
  findOne(term: string): Promise<Driver | null>;
  update(term: string, driver: Driver): Promise<Driver>;
  remove(id: string): Promise<Driver | null>;
  currentLocationDriver(
    idDriver: string,
    latitud: string,
    longitud: string,
  ): void;
  getAvailableDrivers(): Promise<Driver[]>;
  getNearbyDriver(latitude: string, longitude: string): Promise<Driver[]>;
}
