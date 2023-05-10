/* eslint "import/no-cycle": "off" */
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TrackModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
