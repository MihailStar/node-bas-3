/* eslint "import/no-cycle": "off" */
import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
