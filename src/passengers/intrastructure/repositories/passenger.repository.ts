import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import { PassengerEntity } from '../entities/passenger.entity';
import { InjectModel } from '@nestjs/sequelize';
import PassengerMapper from '../mappers/passenger.mapper';
import Passenger from 'src/passengers/domain/models/model.passenger';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class PassengerRepositoryPostgrest implements PassengerRepository {
  constructor(
    @InjectModel(PassengerEntity)
    private readonly passengerEntity: typeof PassengerEntity,
  ) {}

  async findAll(): Promise<Passenger[]> {
    const drivers = await this.passengerEntity.findAll();
    return PassengerMapper.EntitiesToDomains(drivers);
  }

  async create(driver: Passenger): Promise<Passenger> {
    try {
      const driverModel = await this.passengerEntity.create(
        PassengerMapper.DomainToEntity(driver).dataValues,
      );
      return PassengerMapper.EntityToDomain(driverModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't create Passenger, please contact the system administrator`,
      );
    }

    return;
  }

  async findOne(term: string): Promise<Passenger> {
    const passenger = await this.findPassengerEntity(term);
    return PassengerMapper.EntityToDomain(passenger);
  }

  async update(term: string, driver: Passenger): Promise<Passenger> {
    try {
      const passegerModel = await this.findPassengerEntity(term);
      await passegerModel.update(driver);
      return PassengerMapper.EntityToDomain(passegerModel);
    } catch (error) {
      this.handleException(
        error,
        `Can't update Passenger, please contact the system administrator`,
      );
    }
    return;
  }

  async remove(id: string): Promise<Passenger> {
    const deletedCount = await this.passengerEntity.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new BadRequestException(`Passenger with id "${id}" not found`);
    }
    return;
  }

  private handleException(error: any, message: string) {
    if (error.hasOwnProperty('original')) {
      if (error.original.code == 23505) {
        throw new BadRequestException(
          `Passenger exists in db ${JSON.stringify(error.original.detail)}`,
        );
      } else {
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

  private async findPassengerEntity(term: string): Promise<PassengerEntity> {
    let passenger: PassengerEntity;

    if (!isNaN(+term)) {
      passenger = await this.passengerEntity.findOne({
        where: {
          id: {
            [Op.eq]: term,
          },
        },
      });
    } else {
      passenger = await this.passengerEntity.findOne({
        where: {
          name: {
            [Op.like]: term,
          },
          status: {
            [Op.eq]: 'A',
          },
        },
      });
    }
    if (!passenger)
      throw new NotFoundException(
        `Passenger with id,name or no "${term}" not found`,
      );

    return passenger;
  }
}
