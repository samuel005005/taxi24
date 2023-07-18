import { BadRequestException, Injectable } from '@nestjs/common';
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
      trip.getPassaggerId,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateInvoice(trip: Trip): Promise<Trip> {
    throw new Error('Method not implemented.');
  }

  private async getTripsPerPassenger(idPassager: number): Promise<Trip> {
    const trip = await this.tripEntity.findOne({
      where: {
        idPassager: idPassager,
      },
    });
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

  async completeTrip(idTrip: number) {
    const updatedRows = await this.tripEntity.update(
      { status: 'P' },
      { where: { id: { [Op.eq]: idTrip } } },
    );

    if (!updatedRows) {
      throw new BadRequestException(`There is no pending trip with this id`);
    }
  }
}
