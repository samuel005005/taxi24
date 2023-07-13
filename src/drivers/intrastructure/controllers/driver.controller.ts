import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DriverService } from "../services/driver.service";
import { CreateDriverDto } from "../dto/create-driver.dto";
import { UpdateDriverDto } from "../dto/update-driver.dto";
import { ParseMongoIdPipe } from "src/shared/intrastructure/pipes/parse-mongo-id";
import { CurrentLocationDriverDto } from "../dto/current-location-driver-dto";

@Controller('driver')
export class DriverController {
    driverService: any;
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

    @Patch(':term')
    update(@Param('term') term: string, @Body() updateDriverDto: UpdateDriverDto) {
        return this.driveService.update(term, updateDriverDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.driveService.remove(id);
    }

    @Post('location/:id')
    currentLocation(@Param('id', ParseMongoIdPipe) idDriver: string, @Body() currentLocationDriverDto: CurrentLocationDriverDto) {
        return this.driveService.currentLocation(idDriver, currentLocationDriverDto);
    }
}