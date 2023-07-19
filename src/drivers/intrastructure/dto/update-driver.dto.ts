import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDriverDto {
  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MinLength(1)
  lastName?: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  driverLicense?: string;
}
