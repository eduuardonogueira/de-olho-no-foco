import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNotificationsTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsBase64()
  @IsString()
  @IsNotEmpty()
  image: string;
}
