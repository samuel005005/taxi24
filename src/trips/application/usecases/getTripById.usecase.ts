import { TripRepository } from 'src/trips/domain/contracts/trip.repository';
import Trip from 'src/trips/domain/models/trip.model';

export default class GetTripByIdUseCase {
  constructor(private readonly tripRepository: TripRepository) {}

  public handler(id: number): Promise<Trip> {
    return this.tripRepository.findOne(id);
  }
}
