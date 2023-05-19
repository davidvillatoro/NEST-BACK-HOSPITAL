import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateMedicamentoDto {

    @IsString()
    @MinLength(1)
    nombre: string;
    
    @IsString()
    tipo: string;
    
    @IsString()
    estado: string;
    
    @IsString()
    categoria: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    cantidad: number;



}
