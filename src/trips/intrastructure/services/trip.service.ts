import { Inject, Injectable } from '@nestjs/common';
import CreateTripUseCase from 'src/trips/application/usecases/createTrips.useCase';
import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import { CreateTripDto } from '../dto/createTripDto';
import TripMapper from '../mappers/trip.mapper';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';

@Injectable()
export class TripService {
  private readonly createTripUseCase: CreateTripUseCase;

  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
    // @Inject('DriverRepository')
    // private readonly driverRepository: DriverRepository,
  ) {
    // this.createTripUseCase = new CreateTripUseCase(this.tripRepository);
  }

  async resquest(trip: CreateTripDto) {
    // const driver = this.driverRepository.getNearbyDriver(
    //   new LocationModel(trip.source.lattitude, trip.source.longtude),
    // );

    // console.log(driver);
    return this.createTripUseCase.handler(TripMapper.DtoToDomain(trip));
  }
}
