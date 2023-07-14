import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DriverEntity } from '../entities/driver.entity';

import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import Driver from 'src/drivers/domain/models/driver.model';
import DriverMapper from '../mappers/driver.mapper';
import { DriverLocationEntity } from '../entities/locationDrive.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DriverRepositoryPostgrest implements DriverRepository {
  constructor(
    @InjectModel(DriverEntity)
    private readonly driverEntity: typeof DriverEntity,
    @InjectModel(DriverLocationEntity)
    private readonly locationDriverEntity: typeof DriverLocationEntity,
  ) {}

  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverEntity.findAll();
    return DriverMapper.EntitiesToDomains(drivers);
  }

  async create(driver: Driver): Promise<Driver> {
    // try {
    //   const driverModel = await this.driverEntity.create(driver);
    //   return DriverMapper.EntityToDomain(driverModel);
    // } catch (error) {
    //   this.handleException(
    //     error,
    //     `Can't create Driver, please contact the system administrator`,
    //   );
    // }

    return;
  }

  async findOne(term: string): Promise<Driver> {
    const driver = await this.findDriverEntity(term);
    return DriverMapper.EntityToDomain(driver);
  }

  async update(term: string, driver: Driver): Promise<Driver> {
    // try {
    //   const driverModel = await this.findDriverEntity(term);
    //   await driverModel.updateOne(driver, { new: true });
    //   return DriverMapper.EntityToDomain(driverModel);
    // } catch (error) {
    //   this.handleException(
    //     error,
    //     `Can't update Driver, please contact the system administrator`,
    //   );
    // }
    return;
  }

  async remove(id: string): Promise<Driver> {
    // const { deletedCount } = await this.driverEntity.deleteOne({ _id: id });
    // if (deletedCount === 0) {
    //   throw new BadRequestException(`Pokemon with id "${id}" not found`);
    // }
    return;
  }

  async currentLocationDriver(
    idDriver: string,
    latitude: string,
    longitude: string,
  ) {
    // try {
    //   const driver = await this.findDriverEntity(idDriver);
    //   await this.locationDriverEntity.updateMany(
    //     { driver: driver.id },
    //     { $set: { status: 'I' } },
    //   );
    //   await this.locationDriverEntity.create({
    //     driver: driver.id,
    //     latitude,
    //     longitude,
    //   });
    // } catch (error) {
    //   this.handleException(
    //     error,
    //     `Can't current location Driver, please contact the system administrator`,
    //   );
    // }
  }

  async getAvailableDrivers(): Promise<Driver[]> {
    // const drivers = await this.driverEntity.find({
    //   status: 'A',
    //   available: true,
    // });
    // return DriverMapper.EntitiesToDomains(drivers);
    return;
  }

  async getNearbyDriver(
    latitude: string,
    longitude: string,
  ): Promise<Driver[]> {
    // const locations = await this.locationDriverEntity.find({ status: 'A' });
    // locations.filter((driverLocation: DriverLocationEntity) => {
    //   const distance = Math.acos();
    //   console.log(driverLocation);
    // });
    return;
  }

  private handleException(error: any, message: string) {
    console.log(error);
    if (error.code == 11000) {
      throw new BadRequestException(
        `Driver exists in db ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      if (error.status == 404) {
        throw new NotFoundException(error.message);
      } else {
        console.log(error);
        throw new InternalServerErrorException(message);
      }
    }
  }

  private async findDriverEntity(term: string): Promise<DriverEntity> {
    let driver: DriverEntity;

    // Validate if is a mongo a Id
    if (!driver) {
      // driver = await this.driverEntity.get
    }
    // if (!driver) {
    //   driver = await this.driverEntity.findOne({
    //     name: new RegExp(term, 'i'),
    //     status: 'A',
    //   });
    // }
    if (!driver)
      throw new NotFoundException(
        `Driver with id,name or no "${term}" not found`,
      );

    return driver;
  }
}
