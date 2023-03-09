import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entity/album.entity';
import { Artist } from '../../artist/entity/artist.entity';
import { Track } from '../../track/entity/track.entity';
import { FavoritesRepsonseInterface } from '../interface/favorites-repsonse.interface';

export class FavoritesRepsonse implements FavoritesRepsonseInterface {
  @ApiProperty({ type: Artist, isArray: true })
  artists!: Artist[];

  @ApiProperty({ type: Album, isArray: true })
  albums!: Album[];

  @ApiProperty({ type: Track, isArray: true })
  tracks!: Track[];
}
