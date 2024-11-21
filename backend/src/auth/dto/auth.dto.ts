import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toLowerCase())
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
