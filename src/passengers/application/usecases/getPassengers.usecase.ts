import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import Passenger from 'src/passengers/domain/models/model.passenger';

export default class GetPassengerUseCase {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  public handler(): Promise<Passenger[]> {
    return this.passengerRepository.findAll();
  }
}
