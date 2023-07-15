import { Body, Controller, Post } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/createTripDto';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @Post()
  request(@Body() createTripDto: CreateTripDto) {
    return this.tripService.resquest(createTripDto);
  }
}
