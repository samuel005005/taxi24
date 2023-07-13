import { IsString, MinLength } from "class-validator";

export class CurrentLocationDriverDto {
    @IsString()
    @MinLength(1)
    latitud: string;

    @IsString()
    @MinLength(1)
    longitud: string;
}
