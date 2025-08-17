import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNotificationsDto {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  typeId: string;
}
