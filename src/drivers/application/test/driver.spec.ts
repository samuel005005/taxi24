import { beforeEach } from 'node:test';
import { CreateDriverUseCase } from '../usecases';
import { DriverService } from 'src/drivers/intrastructure/services/driver.service';
import { DriverRepository } from 'src/drivers/domain/contracts/repositories/driver.repository';

describe('usescases/driver', () => {
  let createDriver: CreateDriverUseCase;
  let adminUserRepo: DriverRepository;
  let driverService: DriverService;

  beforeEach(() => {
    adminUserRepo = {} as DriverRepository;
    adminUserRepo.findAll = jest.fn();
  });
});
