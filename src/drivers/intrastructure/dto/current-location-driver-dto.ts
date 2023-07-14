import { IsString, MinLength } from 'class-validator';

export class CurrentLocationDriverDto {
  @IsString()
  @MinLength(1)
  latitude: string;

  @IsString()
  @MinLength(1)
  longitude: string;
}
