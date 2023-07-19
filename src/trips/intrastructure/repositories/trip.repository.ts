import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import Trip from 'src/trips/domain/models/trip.model';
import { TripEntity } from '../entities/trip.entity';
import { InjectModel } from '@nestjs/sequelize';
import TripMapper from '../mappers/trip.mapper';
import { Op } from 'sequelize';

@Injectable()
export class TripRepositoryPostgrest implements TripRepository {
  constructor(
    @InjectModel(TripEntity)
    private readonly tripEntity: typeof TripEntity,
  ) {}

  async create(trip: Trip): Promise<Trip> {
    const existsTripsAvailable = await this.getTripsPerPassenger(
      trip.getPassengerId,
    );
    if (existsTripsAvailable) {
      throw new BadRequestException(
        `There is an active trip for this passenger`,
      );
    }

    const tripTemp = await this.tripEntity.create(
      TripMapper.DomainToEntity(trip).dataValues,
    );
    return TripMapper.EntityToDomain(tripTemp);
  }

  private async getTripsPerPassenger(
    idPassenger: number,
  ): Promise<Trip | null> {
    const trip = await this.tripEntity.findOne({
      where: {
        idPassenger: idPassenger,
        status: 'PEN',
      },
    });
    if (!trip) {
      return;
    }
    return TripMapper.EntityToDomain(trip);
  }

  async getAvailableTrips(): Promise<Trip[]> {
    const trip = await this.tripEntity.findAll({
      where: {
        status: {
          [Op.in]: ['PEN', 'A'],
        },
      },
    });
    return TripMapper.EntitiesToDomains(trip);
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripEntity.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
        status: {
          [Op.in]: ['PEN', 'A'],
        },
      },
    });
    if (!trip) {
      throw new NotFoundException(`There is no pending trip with the id ${id}`);
    }
    return TripMapper.EntityToDomain(trip);
  }
  async completeTrip(idTrip: number) {
    const updatedRows = await this.tripEntity.update(
      { status: 'P' },
      {
        where: {
          id: { [Op.eq]: idTrip },
          status: {
            [Op.eq]: 'PEN',
          },
        },
      },
    );

    if (updatedRows[0] == 0) {
      throw new BadRequestException(`There is no pending trip with this id`);
    }
  }
}
