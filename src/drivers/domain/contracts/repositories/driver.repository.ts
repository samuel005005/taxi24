import LocationModel from 'src/shared/domain/models/lotation.model';
import Driver from '../../models/driver.model';

export interface DriverRepository {
  create(driver: Driver): Promise<Driver>;
  findAll(): Promise<Driver[]>;
  findOne(term: string): Promise<Driver | null>;
  update(term: string, driver: Driver): Promise<Driver>;
  remove(id: string): Promise<Driver | null>;
  currentLocationDriver(idDriver: string, location: LocationModel): void;
  getAvailableDrivers(): Promise<Driver[]>;
  getNearbyDriver(
    location: LocationModel,
    distance?: number,
    limit?: number,
  ): Promise<Driver[]>;
}
