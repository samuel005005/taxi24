import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  driverLicense: string;
}
