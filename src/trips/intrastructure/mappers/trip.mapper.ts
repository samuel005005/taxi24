import Trip from 'src/trips/domain/models/trip.model';
import { CreateTripDto } from '../dto/createTripDto';

export default class TripMapper {
  public static DtoToDomain(tripDto: CreateTripDto) {
    const trip = new Trip(
      tripDto.idPassager,
      tripDto.source,
      tripDto.destination,
    );
    return trip;
  }
}
