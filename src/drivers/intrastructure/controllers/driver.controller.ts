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

import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { LocationDto } from '../../../shared/intrastructure/dto/location-dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DriverService } from '../services/driver.service';
@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driveService: DriverService) {}

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driveService.create(createDriverDto);
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get()
  findAll() {
    return this.driveService.findAll();
  }

  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driveService.update(term, updateDriverDto);
  }

  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.driveService.remove(id);
  }

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post('location/:id')
  currentLocation(
    @Param('id', ParseIntPipe) idDriver: string,
    @Body() currentLocationDriverDto: LocationDto,
  ) {
    return this.driveService.currentLocation(
      idDriver,
      currentLocationDriverDto,
    );
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get('available/')
  getAvailableDriver() {
    return this.driveService.getAvailableDriver();
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get('nearby/')
  getNearbyDriver(@Body() locationDto: LocationDto) {
    return this.driveService.getNearbyDrivers(locationDto);
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.driveService.findOne(term);
  }
}
