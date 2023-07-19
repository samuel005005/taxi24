import Trip from 'src/trips/domain/models/trip.model';
import { CreateTripDto } from '../dto/createTripDto';
import { TripEntity } from '../entities/trip.entity';

export default class TripMapper {
  public static DtoToDomain(tripDto: CreateTripDto) {
    const trip = new Trip(
      tripDto.idPassenger,
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
    tripDomain.idPassenger = trip.getPassengerId;
    return tripDomain;
  }
  public static EntityToDomain(tripEntity: TripEntity) {
    const driver = new Trip(
      tripEntity.idPassenger,
      tripEntity.source,
      tripEntity.destination,
      tripEntity.idDriver,
      tripEntity.createdAt,
      tripEntity.status,
      tripEntity.id,
    );
    return driver;
  }

  public static EntitiesToDomains(tripEntity: TripEntity[]): Trip[] {
    const trips = tripEntity.map((tripEntity) =>
      this.EntityToDomain(tripEntity),
    );
    return trips;
  }
}
