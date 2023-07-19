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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('passenger')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createTripDto: CreatePassengerDto) {
    return this.passengerService.create(createTripDto);
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateDriverDto: UpdatePassengerDto,
  ) {
    return this.passengerService.update(term, updateDriverDto);
  }

  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.passengerService.remove(id);
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.passengerService.findOne(term);
  }
}
