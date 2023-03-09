import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './resource/album/album.module';
import { ArtistModule } from './resource/artist/artist.module';
import { FavoritesModule } from './resource/favorites/favorites.module';
import { TrackModule } from './resource/track/track.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    UserModule,
  ],
})
export class AppModule {}
