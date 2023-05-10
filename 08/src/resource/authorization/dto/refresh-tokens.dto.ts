import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken!: string;
}
