import { Inject, Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import { CreateDriverDto } from '../dto/create-driver.dto';
import DriverMapper from '../mappers/driver.mapper';
import CreateDriverUseCase from 'src/drivers/application/usecases/createDriver.usecase';
import GetDriversUseCase from 'src/drivers/application/usecases/getDrivers.usecase';
import GetDriverUseCase from 'src/drivers/application/usecases/getDriver.usecase';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import UpdateDriverUseCase from 'src/drivers/application/usecases/updateDriver.usecase';
import DeleteDriverUseCase from 'src/drivers/application/usecases/deleteDriver.usecase';
import CurrentLocationDriverUseCase from 'src/drivers/application/usecases/currentLocationDriver.usecase';
import { CurrentLocationDriverDto } from '../dto/current-location-driver-dto';

@Injectable()
export class DriverService {
  private readonly createDriverUseCase: CreateDriverUseCase;
  private readonly getDriversUseCase: GetDriversUseCase;
  private readonly getDriverUserCase: GetDriverUseCase;
  private readonly updateDriverUseCase: UpdateDriverUseCase;
  private readonly deleteDriverUser: DeleteDriverUseCase;
  private readonly currentLocationDriverUseCase: CurrentLocationDriverUseCase;

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
    currentLocationDriverDto: CurrentLocationDriverDto,
  ) {
    return this.currentLocationDriverUseCase.handler(
      idDriver,
      currentLocationDriverDto.latitud,
      currentLocationDriverDto.longitud,
    );
  }
}
