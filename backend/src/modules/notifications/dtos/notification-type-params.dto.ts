import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationTypeParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
