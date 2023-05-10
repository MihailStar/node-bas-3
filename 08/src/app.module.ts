import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AlbumModule } from './resource/album/album.module';
import { ArtistModule } from './resource/artist/artist.module';
import { AuthorizationModule } from './resource/authorization/authorization.module';
import { AccessGuard } from './resource/authorization/guard/access.guard';
import { AccessStrategy } from './resource/authorization/strategy/access.strategy';
import { FavoritesModule } from './resource/favorites/favorites.module';
import { TrackModule } from './resource/track/track.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    AlbumModule,
    ArtistModule,
    AuthorizationModule,
    FavoritesModule,
    TrackModule,
    UserModule,
  ],
  providers: [
    AccessStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
