import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DriverEntity } from '../entities/driver.entity';
import { Model, isValidObjectId } from 'mongoose';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import Driver from 'src/drivers/domain/models/driver.model';
import DriverMapper from '../mappers/driver.mapper';
import { DriverLocationEntity } from '../entities/locationDrive.entity';

@Injectable()
export class DriverRepositoryMongo implements DriverRepository {
  constructor(
    @InjectModel(DriverEntity.name)
    private readonly driverEntity: Model<DriverEntity>,
    @InjectModel(DriverLocationEntity.name)
    private readonly locationDriverEntity: Model<DriverLocationEntity>,
  ) {}

  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverEntity.find({ status: 'A' });
    return DriverMapper.EntitiesToDomains(drivers);
  }

  async create(driver: Driver): Promise<Driver> {
    try {
      const driverModel = await this.driverEntity.create(driver);
      return DriverMapper.EntityToDomain(driverModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't create Driver, please contact the system administrator`,
      );
    }
  }

  async findOne(term: string): Promise<Driver> {
    const driver = await this.findDriverEntity(term);
    return DriverMapper.EntityToDomain(driver);
  }

  async update(term: string, driver: Driver): Promise<Driver> {
    try {
      const driverModel = await this.findDriverEntity(term);
      await driverModel.updateOne(driver, { new: true });
      return DriverMapper.EntityToDomain(driverModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't update Driver, please contact the system administrator`,
      );
    }
  }

  async remove(id: string): Promise<Driver> {
    const { deletedCount } = await this.driverEntity.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  async currentLocationDriver(
    idDriver: string,
    latitud: string,
    longitud: string,
  ) {
    try {
      const driver = await this.findDriverEntity(idDriver);

      // const locations = await this.locationDriverEntity.updateMany({driver: '64b05a0b585f53660588bd09'}, {$set: {status: "I"}});
      // console.log(driver)
      await this.locationDriverEntity.create({ driver, latitud, longitud });
    } catch (error) {
      this.handleException(
        error,
        `Can't current location Driver, please contact the system administrator`,
      );
    }
  }

  private handleException(error: any, message: string) {
    if (error.code == 11000) {
      throw new BadRequestException(
        `Driver exists in db ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      if (error.status == 404) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(message);
      }
    }
  }

  private async findDriverEntity(term: string): Promise<DriverEntity> {
    let driver: DriverEntity;

    // Validate if is a mongo a Id
    if (!driver && isValidObjectId(term)) {
      driver = await this.driverEntity.findById({ _id: term, status: 'A' });
    }
    if (!driver) {
      driver = await this.driverEntity.findOne({
        name: new RegExp(term, 'i'),
        status: 'A',
      });
    }
    if (!driver)
      throw new NotFoundException(
        `Driver with id,name or no "${term}" not found`,
      );

    return driver;
  }
}
