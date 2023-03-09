import { ApiProperty } from '@nestjs/swagger';
import { AlbumInterface } from '../interface/album.interface';

export class Album implements AlbumInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: 1970 })
  year: number;

  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  artistId: string | null;

  constructor(props: Album) {
    this.id = props.id;
    this.name = props.name;
    this.year = props.year;
    this.artistId = props.artistId;
  }
}
