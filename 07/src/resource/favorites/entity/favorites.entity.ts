import { ApiProperty } from '@nestjs/swagger';
import { FavoritesInterface } from '../interface/favorites.interface';

export class Favorites implements FavoritesInterface {
  @ApiProperty({ format: 'uuid', isArray: true })
  artists!: string[];

  @ApiProperty({ format: 'uuid', isArray: true })
  albums!: string[];

  @ApiProperty({ format: 'uuid', isArray: true })
  tracks!: string[];
}
