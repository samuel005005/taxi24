import { IsNotEmpty, IsNumber } from 'class-validator';
import LocationModel from 'src/shared/domain/models/lotation.model';

export class CreateTripDto {
  @IsNumber()
  idPassager: number;

  @IsNotEmpty()
  source: LocationModel;

  @IsNotEmpty()
  destination: LocationModel;
}
