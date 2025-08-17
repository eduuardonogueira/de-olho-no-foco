import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CoordinatesDto } from './coordinates.dto';
import { Transform } from 'class-transformer';
import {
  EnumPointPosition,
  EnumPointStatus,
  EnumPointType,
  PointStatus,
  PointType,
} from 'src/types/points';

export class CreatePointDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(EnumPointType)
  type: PointType;

  @MaxLength(100)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(200)
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isAnonymous: boolean;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(EnumPointPosition)
  position: 'left' | 'right';

  @IsNotEmpty()
  coordinates: CoordinatesDto;

  @IsOptional()
  @IsEnum(EnumPointStatus)
  status: PointStatus;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
