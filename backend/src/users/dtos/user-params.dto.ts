import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
