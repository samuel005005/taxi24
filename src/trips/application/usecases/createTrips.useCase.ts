import { TripRepository } from "src/trips/domain/contracts/trip.repository";
import Trip from "src/trips/domain/models/trip.model";


export default class CreateDriverUseCase {
  constructor(private readonly tripRepository: TripRepository) {}

  public handler(trip: Trip): Promise<Trip> {
    return this.tripRepository.create(trip);
  }
}
