import { ApiProperty } from '@nestjs/swagger';
import { TrackInterface } from '../interface/track.interface';

export class Track implements TrackInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  artistId: string | null;

  @ApiProperty({ format: 'uuid', nullable: true, example: null })
  albumId: string | null;

  @ApiProperty({ example: 123 })
  duration: number;

  constructor(props: Track) {
    this.id = props.id;
    this.name = props.name;
    this.artistId = props.artistId;
    this.albumId = props.albumId;
    this.duration = props.duration;
  }
}
