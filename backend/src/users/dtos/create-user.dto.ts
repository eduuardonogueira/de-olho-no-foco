import { Transform } from 'class-transformer';
import {
  IsBase64,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export enum UserRole {
  ADVENTURE = 'adventure',
  ORGANIZATION = 'organization',
  ADMIN = 'admin',
}
export class CreateUserDto {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  password: string;

  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(UserRole)
  role: 'adventure' | 'organization' | 'admin';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  profileImage: string;
}
