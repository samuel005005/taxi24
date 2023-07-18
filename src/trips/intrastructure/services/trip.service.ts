import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import { CreateTripDto } from '../dto/createTripDto';
import TripMapper from '../mappers/trip.mapper';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';
import {
  CompleteTripUseCase,
  CreateTripUseCase,
  GetsAvailableTripsUseCase,
} from 'src/trips/application/usecases';

@Injectable()
export class TripService {
  private readonly createTripUseCase: CreateTripUseCase;
  private readonly getsAvailableTripsUseCase: GetsAvailableTripsUseCase;
  private readonly completeTripUseCase: CompleteTripUseCase;

  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepository,
    @Inject('PassengerRepository')
    private readonly passengerRepository: DriverRepository,
  ) {
    this.createTripUseCase = new CreateTripUseCase(this.tripRepository);
    this.getsAvailableTripsUseCase = new GetsAvailableTripsUseCase(
      this.tripRepository,
    );
    this.completeTripUseCase = new CompleteTripUseCase(this.tripRepository);
  }

  async resquest(trip: CreateTripDto) {
    await this.passengerRepository.findOne(trip.idPassager.toString());
    const driver = await this.driverRepository.getNearbyDriver(
      new LocationModel(trip.source.lattitude, trip.source.longitude),
      100,
      1,
    );
    trip.idDriver = driver[0].getId;
    return this.createTripUseCase.handler(TripMapper.DtoToDomain(trip));
  }

  async getAvailableTrips() {
    return this.getsAvailableTripsUseCase.handler();
  }

  async complete(idTrip: number) {
    return this.completeTripUseCase.handler(idTrip);
  }
}
