import { Inject, Injectable } from "@nestjs/common";
import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import { CreateDriverDto } from "../dto/create-driver.dto";
import DriverMapper from "../mappers/driver.mapper";
import CreateDriverUseCase from "src/drivers/application/usecases/createDriver.usecase";
import GetDriversUseCase from "src/drivers/application/usecases/getDrivers.usecase";
import GetDriverUseCase from "src/drivers/application/usecases/getDriver.usecase";

@Injectable()
export class DriverService {

    private readonly createDriverUseCase : CreateDriverUseCase;
    private readonly getDriversUseCase: GetDriversUseCase;
    private readonly getDriverUserCase: GetDriverUseCase;
    
    constructor(
        @Inject('DriverRepository') private readonly driverRepository : DriverRepository
    ){
        this.createDriverUseCase = new CreateDriverUseCase(this.driverRepository);
        this.getDriversUseCase = new GetDriversUseCase(this.driverRepository);
        this.getDriverUserCase = new GetDriverUseCase(this.driverRepository);
    }

    async create(driver:CreateDriverDto) {
        return this.createDriverUseCase.handler(DriverMapper.DtoToDomain(driver));
    }

    async findAll(){
        return this.getDriversUseCase.handler();
    }

    async findOne(term: string){
        return this.getDriverUserCase.handler(term);
    }
}