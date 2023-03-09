import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  grammy!: boolean;
}
