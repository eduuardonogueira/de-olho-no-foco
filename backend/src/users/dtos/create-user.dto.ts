import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @Max(50)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Max(50)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Max(50)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Max(100)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Max(20)
  @IsNotEmpty()
  @IsString()
  role: 'adventure' | 'organization' | 'admin';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
