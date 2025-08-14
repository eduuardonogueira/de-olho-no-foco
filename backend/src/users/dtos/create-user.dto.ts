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
import { EnumUserRoles, UserRoles } from 'src/types/user';

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
  @IsEnum(EnumUserRoles)
  role: UserRoles;

  @IsOptional()
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  profileImage: string;
}
