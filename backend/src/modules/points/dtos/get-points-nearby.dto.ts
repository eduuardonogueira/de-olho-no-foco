import { IsNotEmpty, IsString } from 'class-validator';

export class GetPointsNearbyDto {
  @IsNotEmpty()
  @IsString()
  maxDistance: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;
}
