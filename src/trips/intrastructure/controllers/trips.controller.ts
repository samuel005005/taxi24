import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/createTripDto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post()
  request(@Body() createTripDto: CreateTripDto) {
    return this.tripService.resquest(createTripDto);
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get()
  getAvailableTrips() {
    return this.tripService.getAvailableTrips();
  }

  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Patch('complete/:id')
  complete(@Param('id') id: number) {
    return this.tripService.complete(id);
  }
}
