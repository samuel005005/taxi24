import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DriverService } from "../services/driver.service";
import { CreateDriverDto } from "../dto/create-driver.dto";

@Controller('driver')
export class DriverController {
    constructor(
        private readonly driveService: DriverService
    ) { }

    @Post()
    create(@Body() createDriverDto: CreateDriverDto) {
        return this.driveService.create(createDriverDto);
    }

    @Get()
    findAll() {
        return this.driveService.findAll();
    }

    @Get(':term')
    findOne(@Param('term') term: string) {
        return this.driveService.findOne(term);
    }
}