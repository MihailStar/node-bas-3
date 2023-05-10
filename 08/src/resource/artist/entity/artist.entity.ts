import { ApiProperty } from '@nestjs/swagger';
import { ArtistInterface } from '../interface/artist.interface';

export class Artist implements ArtistInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;

  constructor(props: Artist) {
    this.id = props.id;
    this.name = props.name;
    this.grammy = props.grammy;
  }
}
