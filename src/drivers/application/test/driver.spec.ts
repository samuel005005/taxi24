import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';
import GetDriversUseCase from '../usecases/getDrivers.usecase';
import GetDriverUseCase from '../usecases/getDriver.usecase';
import Driver from '../../domain/models/driver.model';

describe('usescases/driver', () => {
  let getDriversUseCase: GetDriversUseCase;
  let getDriverUseCase: GetDriverUseCase;
  let driverRepo: DriverRepository;

  beforeEach(() => {
    driverRepo = {} as DriverRepository;
    driverRepo.findAll = jest.fn();
    driverRepo.findOne = jest.fn();

    getDriversUseCase = new GetDriversUseCase(driverRepo);
    getDriverUseCase = new GetDriverUseCase(driverRepo);
  });

  describe('getting all drivers', () => {
    it('should return 2 drivers', async () => {
      const driver: Driver[] = [
        new Driver('Samuel', 'Paez', '8096595845', '40236589877'),
        new Driver('Juan', 'Venito', '8096525845', '40236569877'),
      ];

      (driverRepo.findAll as jest.Mock).mockReturnValue(
        Promise.resolve(driver),
      );
      expect(await getDriversUseCase.handler()).toEqual(driver);
    });
  });

  describe('getting a driver', () => {
    it('should return 1 driver', async () => {
      const driver: Driver = new Driver(
        'Samuel',
        'Paez',
        '8096595845',
        '40236589877',
      );

      (driverRepo.findOne as jest.Mock).mockReturnValue(
        Promise.resolve(driver),
      );
      expect(await getDriverUseCase.handler('1')).toEqual(driver);
    });
  });
});
