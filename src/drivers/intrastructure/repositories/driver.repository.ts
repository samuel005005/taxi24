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
import { Op, QueryTypes } from 'sequelize';
import LocationModel from 'src/shared/domain/models/lotation.model';

@Injectable()
export class DriverRepositoryPostgrest implements DriverRepository {
  constructor(
    @InjectModel(DriverEntity)
    private readonly driverEntity: typeof DriverEntity,
    @InjectModel(DriverLocationEntity)
    private readonly locationDriverEntity: typeof DriverLocationEntity,
  ) { }

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
    { lattitude, longtude }: LocationModel
  ) {
    try {

      const driver = await this.findDriverEntity(idDriver);

      await this.locationDriverEntity.update(
        { status: 'I' },
        { where: { driver: driver.id } },
      );
      const lat: number = parseFloat(lattitude);
      const lgn: number = parseFloat(longtude);

      await this.locationDriverEntity.create({
        driver: driver.id,
        latitude: lat,
        longitude: lgn,
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
        available: {
          [Op.eq]: 'true'
        },
        status: {
          [Op.eq]: 'A'
        },
      },
    });
    return DriverMapper.EntitiesToDomains(drivers);
  }

  async getNearbyDriver(
    { lattitude, longtude }: LocationModel
  ): Promise<Driver[]> {
    const query =
      `WITH distances
      AS (SELECT
        de.*,
        dle.latitude,
        dle.longitude,
        (3959 * ACOS(COS(RADIANS(${lattitude})) * COS(RADIANS(dle.latitude)) * COS(RADIANS(dle.longitude) - RADIANS(${longtude})) + SIN(RADIANS(${lattitude})) * SIN(RADIANS(dle.latitude)))) AS distance
      FROM "DriverLocationEntities" dle
      JOIN "DriverEntities" de
        ON dle.driver = de.id
        AND de.status = 'A'
      WHERE dle.status = 'A')
      SELECT
        *
      FROM distances
      WHERE distance < 3`;
    const results = await this.locationDriverEntity.sequelize.query(query, { raw: false, type: QueryTypes.SELECT });


    return results.map((driver) => {
      return new Driver(driver['id'],
        driver['name'],
        driver['lastName'],
        driver['phoneNumber'],
        driver['driverLicense'],
        driver['available'],
        driver['status']);
    });


  }

  private handleException(error: any, message: string) {
    if(error.hasOwnProperty('original')){

      if (error.original.code == 23505) {
        throw new BadRequestException(
          `Driver exists in db ${JSON.stringify(error.original.detail)}`,
        );
      }else{
        if (error.original.code == 42883) {
          throw new NotFoundException(error.message);
        }
      } 
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
          id: {
            [Op.eq]: term
          },
        },
      });
    } else {
      driver = await this.driverEntity.findOne({
        where: {
          name: {
            [Op.contains]: term
          }, 
          status: {
            [Op.eq]: 'A'
          },
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
