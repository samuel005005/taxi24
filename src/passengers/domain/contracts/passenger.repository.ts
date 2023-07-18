import Passenger from '../models/model.passenger';

export interface PassengerRepository {
  create(driver: Passenger): Promise<Passenger>;
  findAll(): Promise<Passenger[]>;
  findOne(term: string): Promise<Passenger | null>;
  update(term: string, driver: Passenger): Promise<Passenger>;
  remove(id: string): Promise<Passenger | null>;
}
