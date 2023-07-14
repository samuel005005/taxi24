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
    try {
      const driverModel = await this.driverEntity.create(
        DriverMapper.DomainToEntity(driver).dataValues,
      );
      return DriverMapper.EntityToDomain(driverModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't create Driver, please contact the system administrator`,
      );
    }

    return;
  }

  async findOne(term: string): Promise<Driver> {
    const driver = await this.findDriverEntity(term);
    return DriverMapper.EntityToDomain(driver);
  }

  async update(term: string, driver: Driver): Promise<Driver> {
    try {
      const driverModel = await this.findDriverEntity(term);
      await driverModel.update(driver);
      return DriverMapper.EntityToDomain(driverModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't update Driver, please contact the system administrator`,
      );
    }
    return;
  }

  async remove(id: string): Promise<Driver> {
    const deletedCount = await this.driverEntity.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  async currentLocationDriver(
    idDriver: string,
    latitude: string,
    longitude: string,
  ) {
    try {
      const driver = await this.findDriverEntity(idDriver);
      await this.locationDriverEntity.update(
        { status: 'I' },
        { where: { driver: driver.id } },
      );
      await this.locationDriverEntity.create({
        driver: driver.id,
        latitude,
        longitude,
      });
    } catch (error) {
      this.handleException(
        error,
        `Can't current location Driver, please contact the system administrator`,
      );
    }
  }

  async getAvailableDrivers(): Promise<Driver[]> {
    const drivers = await this.driverEntity.findAll({
      where: {
        status: 'A',
        available: 'true',
      },
    });
    return DriverMapper.EntitiesToDomains(drivers);
    return;
  }

  async getNearbyDriver(
    latitude: string,
    longitude: string,
  ): Promise<Driver[]> {
    const query = 'SELECT * FROM "DriverLocationEntities" ';
    const [results] = await this.locationDriverEntity.sequelize.query(query);
    // const locations = await this.locationDriverEntity.find({ status: 'A' });
    // locations.filter((driverLocation: DriverLocationEntity) => {
    //   const distance = Math.acos();
    //   console.log(driverLocation);
    // });
    return;
  }

  private handleException(error: any, message: string) {
    if (error.original.code == 23505) {
      throw new BadRequestException(
        `Driver exists in db ${JSON.stringify(error.original.detail)}`,
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

    if (!isNaN(+term)) {
      driver = await this.driverEntity.findOne({
        where: {
          id: +term,
        },
      });
    }
    if (!driver) {
      driver = await this.driverEntity.findOne({
        where: {
          name: new RegExp(term, 'i'),
          status: 'A',
        },
      });
    }
    if (!driver)
      throw new NotFoundException(
        `Driver with id,name or no "${term}" not found`,
      );

    return driver;
  }
}
