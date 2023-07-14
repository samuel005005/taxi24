import { IsString, MinLength } from 'class-validator';

export class LocationDto {
  @IsString()
  @MinLength(1)
  latitude: string;

  @IsString()
  @MinLength(1)
  longitude: string;
}
