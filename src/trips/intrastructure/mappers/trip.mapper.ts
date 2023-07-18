import Trip from 'src/trips/domain/models/trip.model';
import { CreateTripDto } from '../dto/createTripDto';
import { TripEntity } from '../entities/trip.entity';

export default class TripMapper {
  public static DtoToDomain(tripDto: CreateTripDto) {
    const trip = new Trip(
      tripDto.idPassager,
      tripDto.source,
      tripDto.destination,
      tripDto.idDriver,
    );
    return trip;
  }
  public static DomainToEntity(trip: Trip): TripEntity {
    const tripDomain = new TripEntity();
    tripDomain.idDriver = trip.getDriverId;
    tripDomain.source = trip.getSource;
    tripDomain.destination = trip.getDestination;
    tripDomain.idPassager = trip.getPassaggerId;
    return tripDomain;
  }
  public static EntityToDomain(tripEntity: TripEntity) {
    const driver = new Trip(
      tripEntity.idPassager,
      tripEntity.source,
      tripEntity.destination,
      tripEntity.idDriver,
      tripEntity.createdAt,
      tripEntity.status,
      tripEntity.id,
    );

    return driver;
  }

  public static EntitiesToDomains(driverEntity: TripEntity[]): Trip[] {
    const trips = driverEntity.map((tripEntity) =>
      this.EntityToDomain(tripEntity),
    );
    return trips;
  }
}
