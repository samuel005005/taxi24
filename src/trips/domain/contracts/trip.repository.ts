import Trip from '../models/trip.model';

export interface TripRepository {
  create(trip: Trip): Promise<Trip>;
  findAll(): Promise<Trip[]>;
  generateInvoice(trip: Trip): Promise<Trip>;
}
