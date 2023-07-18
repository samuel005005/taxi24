import Trip from '../models/trip.model';

export interface TripRepository {
  create(trip: Trip): Promise<Trip>;
  generateInvoice(trip: Trip): Promise<Trip>;
  getAvailableTrips(): Promise<Trip[]>;
  completeTrip(idTrip: number): void;
}
