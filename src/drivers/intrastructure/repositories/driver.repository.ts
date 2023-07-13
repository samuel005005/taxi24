import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DriverEntity } from "../entities/driver.entity";
import { Model, isValidObjectId } from "mongoose";
import { DriverRepository } from "src/drivers/domain/contracts/repositories/driver.repository";
import Driver from "src/drivers/domain/models/driver.model";
import DriverMapper from "../mappers/driver.mapper";

@Injectable()
export class DriverRepositoryMongo implements DriverRepository {
    constructor(
        @InjectModel(DriverEntity.name)
        private readonly driverEntity: Model<DriverEntity>
    ) { }

    async findAll(): Promise<Driver[]> {
        const drivers = await this.driverEntity.find();
        return DriverMapper.EntitiesToDomains(drivers);

    }

    async create(driver: Driver): Promise<Driver> {
        try {
            const driverModel = await this.driverEntity.create(driver);
            return DriverMapper.EntityToDomain(driverModel);
        } catch (error) {
            this.handleException(error, `Can't create Driver`);
        }
    }

    async findOne(term: string): Promise<Driver> {
       const driver = await this.findDriverEntity(term);
       return DriverMapper.EntityToDomain(driver);

    }

    update(term: string, driver: Driver): Promise<Driver> {
        throw new Error("Method not implemented.");
    }
    
    remove(id: string): Promise<Driver> {
        throw new Error("Method not implemented.");
    }

    private handleException(error: any, message: string) {
        if (error.code == 11000) {
            throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
        } else {
            if (error.respone == 404) {
                throw new NotFoundException(error.message);
            } else {
                console.log(error)
                throw new InternalServerErrorException(message)
            }
        }
    }


    private async findDriverEntity(term: string): Promise<DriverEntity> {

        let pokemon: DriverEntity;
        // Validate if is a number
        if (!isNaN(+term)) {
            pokemon = await this.driverEntity.findOne({ no: term });
        }

        // Validate if is a mongo a Id
        if (!pokemon && isValidObjectId(term)) {
            pokemon = await this.driverEntity.findById(term);
        }
        if (!pokemon) {
            pokemon = await this.driverEntity.findOne({ name: new RegExp(term.toLocaleLowerCase().trim(), 'i') });
        }
        if (!pokemon)
            throw new NotFoundException(`Driver with id,name or no "${term}" not found`);

        return pokemon;
    }

}