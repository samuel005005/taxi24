import Driver from 'src/drivers/domain/models/driver.model';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { DriverEntity } from '../entities/driver.entity';

export default class DriverMapper {
  public static DomainToEntity(driver: Driver): DriverEntity {
    const driverEntity = new DriverEntity();
    driverEntity.name = driver.getName;
    driverEntity.lastName = driver.getLastName;
    driverEntity.phoneNumber = driver.getPhoneNumber;
    driverEntity.driverLicense = driver.getDriverLicense;
    return driverEntity;
  }

  public static EntityToDomain(driverEntity: DriverEntity) {
    const driver = new Driver(
      driverEntity.name,
      driverEntity.lastName,
      driverEntity.phoneNumber,
      driverEntity.driverLicense,
      driverEntity.id,
      driverEntity.available,
    );

    return driver;
  }

  public static DtoToDomain(driverDto: CreateDriverDto | UpdateDriverDto) {
    const driver = new Driver(
      driverDto.name,
      driverDto.lastName,
      driverDto.phoneNumber,
      driverDto.driverLicense,
    );

    return driver;
  }

  public static EntitiesToDomains(driverEntity: DriverEntity[]): Driver[] {
    const drivers = driverEntity.map((driverEntity) =>
      this.EntityToDomain(driverEntity),
    );
    return drivers;
  }
}
