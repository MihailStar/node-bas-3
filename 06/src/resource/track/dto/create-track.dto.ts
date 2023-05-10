import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '../../../common/uuid-version';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;

  @ValidateIf(({ artistId }) => artistId !== null)
  @IsUUID(UUID_VERSION)
  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  artistId!: string | null;

  @ValidateIf(({ albumId }) => albumId !== null)
  @IsUUID(UUID_VERSION)
  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  albumId!: string | null;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 123 })
  duration!: number;
}
