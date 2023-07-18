import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import Passenger from 'src/passengers/domain/models/model.passenger';

export default class UpdatePassengerUseCase {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  public handler(term: string, driver: Passenger): Promise<Passenger | null> {
    return this.passengerRepository.update(term, driver);
  }
}
