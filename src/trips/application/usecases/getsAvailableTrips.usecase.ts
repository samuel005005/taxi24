import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import Trip from 'src/trips/domain/models/trip.model';

export default class GetsAvailableTripsUseCase {
  constructor(private readonly tripRepository: TripRepository) {}

  public handler(): Promise<Trip[]> {
    return this.tripRepository.getAvailableTrips();
  }
}
