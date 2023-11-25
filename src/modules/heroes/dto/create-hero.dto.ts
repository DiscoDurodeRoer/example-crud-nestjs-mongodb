import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHeroDto {

    @IsString() // Valida si es un string
    @IsNotEmpty() // Valida si tiene valor
    @Transform(({ value }) => value.trim()) // Le quito los espacios por delante y detras
    name: string;

    @IsNumber() // Valida si es un numero
    @IsOptional() // Indica que el valor es no obligatorio
    age: number;

    @IsString() // Valida si es un string
    @IsOptional() // Indica que el valor es no obligatorio
    superpower: string;

}
