import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class NotificationParamsDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isRead: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  expiresAt: Date;
}
