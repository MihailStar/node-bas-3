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

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 1970 })
  year!: number;

  @ValidateIf(({ artistId }) => artistId !== null)
  @IsUUID(UUID_VERSION)
  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  artistId!: string | null;
}
