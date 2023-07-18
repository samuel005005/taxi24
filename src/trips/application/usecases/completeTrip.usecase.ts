import { TripRepository } from 'src/trips/domain/contracts/trip.repository';

export default class CompleteTripUseCase {
  constructor(private readonly tripRepository: TripRepository) {}

  public handler(idTrip: number) {
    return this.tripRepository.completeTrip(idTrip);
  }
}
