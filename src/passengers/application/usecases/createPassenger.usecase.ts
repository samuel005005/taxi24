import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import Passenger from 'src/passengers/domain/models/model.passenger';

export default class CreatePassengerUseCase {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  public handler(passenger: Passenger): Promise<Passenger> {
    return this.passengerRepository.create(passenger);
  }
}
