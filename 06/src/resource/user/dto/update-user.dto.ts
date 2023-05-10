import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

/**
 * UpdatePasswordDto
 */
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  oldPassword!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPassword!: string;
}
