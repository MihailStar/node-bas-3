import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  login!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password!: string;
}
