import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  email: string;
}
