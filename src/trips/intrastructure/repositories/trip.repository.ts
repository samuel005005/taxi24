import { Injectable } from '@nestjs/common';
import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import Trip from 'src/trips/domain/models/trip.model';
import { TripEntity } from '../entities/trip.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TripRepositoryPostgrest implements TripRepository {
  constructor(
    @InjectModel(TripEntity)
    private readonly tripEntity: typeof TripEntity,
  ) {}
  create(trip: Trip): Promise<Trip> {
    console.log(trip);
    return;
  }
  findAll(): Promise<Trip[]> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateInvoice(trip: Trip): Promise<Trip> {
    throw new Error('Method not implemented.');
  }
}
