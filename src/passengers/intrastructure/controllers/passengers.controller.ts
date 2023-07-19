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
import { PassengerService } from '../services/driver.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passenger')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}
  @Post()
  create(@Body() createTripDto: CreatePassengerDto) {
    return this.passengerService.create(createTripDto);
  }
  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateDriverDto: UpdatePassengerDto,
  ) {
    return this.passengerService.update(term, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.passengerService.remove(id);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.passengerService.findOne(term);
  }
}
