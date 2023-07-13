import Driver from "src/drivers/domain/models/driver.model";
import { CreateDriverDto } from "../dto/create-driver.dto";
import { UpdateDriverDto } from "../dto/update-driver.dto";
import { DriverEntity } from "../entities/driver.entity";


export default class DriverMapper {

    public static EntityToDomain(driverEntity: DriverEntity) {

        const driver = new Driver(
            driverEntity.name,
            driverEntity.lastName,
            driverEntity.phoneNumber,
            driverEntity.driverLicense,
            driverEntity.id,
        );

        return driver;
    }

    public static DtoToDomain(driverDto: CreateDriverDto | UpdateDriverDto) {

        const driver = new Driver(
            driverDto.name,
            driverDto.lastName,
            driverDto.phoneNumber,
            driverDto.driverLicense
        );

        return driver;
    }

    public static EntitiesToDomains(driverEntity: DriverEntity[]): Driver[] {
        const drivers = driverEntity.map((driverEntity => this.EntityToDomain(driverEntity)))
        return drivers;
    }
}
