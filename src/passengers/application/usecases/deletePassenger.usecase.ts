import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';

export default class DeletePassengerUseCase {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  public handler(term: string) {
    return this.passengerRepository.remove(term);
  }
}
