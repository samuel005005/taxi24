import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePassenger,
  DeletePassenger,
  GetPassenger,
  GetPassengers,
  UpdatePassenger,
} from 'src/passengers/application/usecases';
import { PassengerRepository } from 'src/passengers/domain/contracts/passenger.repository';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import PassengerMapper from '../mappers/passenger.mapper';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

@Injectable()
export class PassengerService {
  private readonly createPassengerUseCase: CreatePassenger;
  private readonly getPassengersUseCase: GetPassengers;
  private readonly getPassengerUserCase: GetPassenger;
  private readonly updatePassengerUseCase: UpdatePassenger;
  private readonly deletePassengerUseCase: DeletePassenger;

  constructor(
    @Inject('PassengerRepository')
    private readonly passengerRepository: PassengerRepository,
  ) {
    this.createPassengerUseCase = new CreatePassenger(this.passengerRepository);
    this.getPassengersUseCase = new GetPassengers(this.passengerRepository);
    this.getPassengerUserCase = new GetPassenger(this.passengerRepository);
    this.updatePassengerUseCase = new UpdatePassenger(this.passengerRepository);
    this.deletePassengerUseCase = new DeletePassenger(this.passengerRepository);
  }

  async create(driver: CreatePassengerDto) {
    return this.createPassengerUseCase.handler(
      PassengerMapper.DtoToDomain(driver),
    );
  }

  async findAll() {
    return this.getPassengersUseCase.handler();
  }

  async findOne(term: string) {
    return this.getPassengerUserCase.handler(term);
  }

  async update(term: string, updateDriverDto: UpdatePassengerDto) {
    if (updateDriverDto.name) {
      updateDriverDto.name = updateDriverDto.name.toLocaleLowerCase();
    }

    const driver = await this.updatePassengerUseCase.handler(
      term,
      PassengerMapper.DtoToDomain(updateDriverDto),
    );

    return { ...driver, ...updateDriverDto };
  }

  async remove(id: string) {
    return this.deletePassengerUseCase.handler(id);
  }
}
