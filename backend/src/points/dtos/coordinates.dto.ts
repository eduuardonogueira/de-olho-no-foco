import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CoordinatesDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  alt: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rotation: number;
}
