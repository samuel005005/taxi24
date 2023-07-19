import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import LocationModel from 'src/shared/domain/models/lotation.model';

export class CreateTripDto {
  @IsNumber()
  @IsOptional()
  idDriver: number;

  @IsNumber()
  idPassenger: number;

  @IsNotEmpty()
  source: LocationModel;

  @IsNotEmpty()
  destination: LocationModel;
}
