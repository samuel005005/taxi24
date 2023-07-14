import { Inject, Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import DriverMapper from '../mappers/driver.mapper';
import {
  CreateDriverUseCase,
  CurrentLocationDriverUseCase,
  DeleteDriverUseCase,
  GetAvailableDriversUseCase,
  GetDriverUseCase,
  GetDriversUseCase,
  UpdateDriverUseCase,
} from 'src/drivers/application/usecases/index';
import {
  CreateDriverDto,
  UpdateDriverDto,
  CurrentLocationDriverDto,
  GetNearbyDriverUseCase,
} from '../dto';

@Injectable()
export class DriverService {
  private readonly createDriverUseCase: CreateDriverUseCase;
  private readonly getDriversUseCase: GetDriversUseCase;
  private readonly getDriverUserCase: GetDriverUseCase;
  private readonly updateDriverUseCase: UpdateDriverUseCase;
  private readonly deleteDriverUser: DeleteDriverUseCase;
  private readonly currentLocationDriverUseCase: CurrentLocationDriverUseCase;
  private readonly getAvailableDriverUseCase: GetAvailableDriversUseCase;
  private readonly getNearbyDriverUseCase: GetNearbyDriverUseCase;

  constructor(
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepository,
  ) {
    this.createDriverUseCase = new CreateDriverUseCase(this.driverRepository);
    this.getDriversUseCase = new GetDriversUseCase(this.driverRepository);
    this.getDriverUserCase = new GetDriverUseCase(this.driverRepository);
    this.updateDriverUseCase = new UpdateDriverUseCase(this.driverRepository);
    this.deleteDriverUser = new DeleteDriverUseCase(this.driverRepository);
    this.currentLocationDriverUseCase = new CurrentLocationDriverUseCase(
      this.driverRepository,
    );
    this.getAvailableDriverUseCase = new GetAvailableDriversUseCase(
      this.driverRepository,
    );
    this.getNearbyDriverUseCase = new GetNearbyDriverUseCase(
      this.driverRepository,
    );
  }

  async create(driver: CreateDriverDto) {
    return this.createDriverUseCase.handler(DriverMapper.DtoToDomain(driver));
  }

  async findAll() {
    return this.getDriversUseCase.handler();
  }

  async findOne(term: string) {
    return this.getDriverUserCase.handler(term);
  }

  async update(term: string, updateDriverDto: UpdateDriverDto) {
    if (updateDriverDto.name) {
      updateDriverDto.name = updateDriverDto.name.toLocaleLowerCase();
    }

    const driver = await this.updateDriverUseCase.handler(
      term,
      DriverMapper.DtoToDomain(updateDriverDto),
    );

    return { ...driver, ...updateDriverDto };
  }

  async remove(id: string) {
    return this.deleteDriverUser.handler(id);
  }

  async currentLocation(
    idDriver: string,
    { latitude, longitude }: CurrentLocationDriverDto,
  ) {
    return this.currentLocationDriverUseCase.handler(
      idDriver,
      latitude,
      longitude,
    );
  }
  async getAvailableDriver() {
    return this.getAvailableDriverUseCase.handler();
  }
  async getNearbyDrivers({ latitude, longitude }: CurrentLocationDriverDto) {
    return this.getNearbyDriverUseCase.handler(latitude, longitude);
  }
}
