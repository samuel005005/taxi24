import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DriverService } from '../services/driver.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { CurrentLocationDriverDto } from '../dto/current-location-driver-dto';

@Controller('driver')
export class DriverController {
  driverService: any;
  constructor(private readonly driveService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driveService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driveService.findAll();
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driveService.update(term, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.driveService.remove(id);
  }

  @Post('location/:id')
  currentLocation(
    @Param('id', ParseIntPipe) idDriver: string,
    @Body() currentLocationDriverDto: CurrentLocationDriverDto,
  ) {
    return this.driveService.currentLocation(
      idDriver,
      currentLocationDriverDto,
    );
  }

  @Get('available/')
  getAvailableDriver() {
    return this.driveService.getAvailableDriver();
  }

  @Get('nearby/')
  getNearbyDriver(@Body() currentLocationDriverDto: CurrentLocationDriverDto) {
    return this.driveService.getNearbyDrivers(currentLocationDriverDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.driveService.findOne(term);
  }
}
