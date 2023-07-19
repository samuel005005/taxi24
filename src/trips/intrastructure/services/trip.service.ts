import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import { CreateTripDto } from '../dto/createTripDto';
import TripMapper from '../mappers/trip.mapper';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import LocationModel from 'src/shared/domain/models/lotation.model';
import {
  CompleteTripUseCase,
  CreateTripUseCase,
  GetTripByIdUseCase,
  GetsAvailableTripsUseCase,
} from 'src/trips/application/usecases';
import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import { InvoiceRepository } from 'src/invoices/domain/contracts/invoice.repository';
import Invoice from 'src/invoices/domain/models/invoice.model';

@Injectable()
export class TripService {
  private readonly createTripUseCase: CreateTripUseCase;
  private readonly getsAvailableTripsUseCase: GetsAvailableTripsUseCase;
  private readonly completeTripUseCase: CompleteTripUseCase;
  private readonly getTripByIdUseCase: GetTripByIdUseCase;

  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepository,
    @Inject('PassengerRepository')
    private readonly passengerRepository: PassengerRepository,
    @Inject('InvoiceRepository')
    private readonly invoiceRepository: InvoiceRepository,
  ) {
    this.createTripUseCase = new CreateTripUseCase(this.tripRepository);
    this.getsAvailableTripsUseCase = new GetsAvailableTripsUseCase(
      this.tripRepository,
    );
    this.completeTripUseCase = new CompleteTripUseCase(this.tripRepository);
    this.getTripByIdUseCase = new GetTripByIdUseCase(this.tripRepository);
  }

  async resquest(trip: CreateTripDto) {
    await this.passengerRepository.findOne(trip.idPassenger.toString());
    const driver = await this.driverRepository.getNearbyDriver(
      new LocationModel(trip.source.lattitude, trip.source.longitude),
      100,
      1,
    );
    if (driver.length == 0) {
      throw new BadRequestException(`No drivers available at this time`);
    }
    trip.idDriver = driver[0].getId;
    return this.createTripUseCase.handler(TripMapper.DtoToDomain(trip));
  }

  async getAvailableTrips() {
    return this.getsAvailableTripsUseCase.handler();
  }

  async complete(idTrip: number): Promise<Invoice> {
    const trip = await this.getTripByIdUseCase.handler(idTrip);
    const amount = Math.floor(100000 + Math.random() * 900000);

    const invoice = this.invoiceRepository.generateInvoice(
      new Invoice(idTrip, trip.getPassengerId, amount),
    );
    if (invoice) {
      this.completeTripUseCase.handler(idTrip);
    }

    return invoice;
  }
}
