/* eslint "import/no-cycle": "off" */
import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
