import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CoordinatesDto } from './coordinates.dto';
import { Transform } from 'class-transformer';

export enum PointType {
  SANITATION = 'sanitation',
  COURTEOUS = 'courteous',
  TRASH = 'trash',
  FLOOD = 'flood',
}

export enum PointPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export class CreatePointDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(PointType)
  type: 'sanitation' | 'courteous' | 'trash' | 'flood';

  @MaxLength(200)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(PointPosition)
  position: 'left' | 'right';

  @IsNotEmpty()
  coordinates: CoordinatesDto;
}
