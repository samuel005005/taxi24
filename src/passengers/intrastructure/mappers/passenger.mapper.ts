import Passenger from 'src/passengers/domain/models/model.passenger';
import { PassengerEntity } from '../entities/passenger.entity';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

export default class PassengerMapper {
  public static DomainToEntity(passenger: Passenger): PassengerEntity {
    const passengerEntity = new PassengerEntity();
    passengerEntity.name = passenger.getName;
    passengerEntity.lastName = passenger.getLastName;
    passengerEntity.phoneNumber = passenger.getPhoneNumber;
    passengerEntity.identificationCard = passenger.getIdentificationCard;
    return passengerEntity;
  }

  public static EntityToDomain(passengerEntity: PassengerEntity) {
    const passenger = new Passenger(
      passengerEntity.name,
      passengerEntity.lastName,
      passengerEntity.phoneNumber,
      passengerEntity.identificationCard,
      passengerEntity.id,
    );

    return passenger;
  }

  public static DtoToDomain(
    passengerDto: CreatePassengerDto | UpdatePassengerDto,
  ) {
    const passenger = new Passenger(
      passengerDto.name,
      passengerDto.lastName,
      passengerDto.phoneNumber,
      passengerDto.identificationCard,
    );

    return passenger;
  }

  public static EntitiesToDomains(
    passengerEntity: PassengerEntity[],
  ): Passenger[] {
    const passengers = passengerEntity.map((passengerEntity) =>
      this.EntityToDomain(passengerEntity),
    );
    return passengers;
  }
}
