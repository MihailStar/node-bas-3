/* eslint "class-methods-use-this": "off" */
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { validateUuidPipe } from '../../common/validate-uuid-pipe';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/entity/album.entity';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entity/artist.entity';
import { Track } from '../track/entity/track.entity';
import { TrackService } from '../track/track.service';
import { FavoritesRepsonse } from './entity/favorites-repsonse';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: FavoritesRepsonse,
    isArray: true,
  })
  async readAll(): Promise<FavoritesRepsonse> {
    const {
      albums: albumIds,
      artists: artistIds,
      tracks: trackIds,
    } = await this.favoritesService.readAll();
    const favoritesRepsonse: FavoritesRepsonse = {
      albums: await Promise.all(
        albumIds.map((albumId) => this.albumService.read(albumId)),
      ),
      artists: await Promise.all(
        artistIds.map((artistId) => this.artistService.read(artistId)),
      ),
      tracks: await Promise.all(
        trackIds.map((trackId) => this.trackService.read(trackId)),
      ),
    };

    return favoritesRepsonse;
  }

  /**
   * @throws {HttpException}
   */
  @Post('album/:id')
  @ApiResponse({ status: HttpStatus.CREATED, type: Album })
  async addAlbum(@Param('id', validateUuidPipe) id: string): Promise<Album> {
    const addedAlbum = await this.getEntity(this.albumService, id);

    await this.throwExceptionIfAlreadyAdded('Album', id);
    await this.favoritesService.addAlbum(id);

    return addedAlbum;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteAlbum(@Param('id', validateUuidPipe) id: string): Promise<void> {
    await this.favoritesService.deleteAlbum(id);
  }

  /**
   * @throws {HttpException}
   */
  @Post('artist/:id')
  @ApiResponse({ status: HttpStatus.CREATED, type: Artist })
  async addArtist(@Param('id', validateUuidPipe) id: string): Promise<Artist> {
    const addedArtist = await this.getEntity(this.artistService, id);

    await this.throwExceptionIfAlreadyAdded('Artist', id);
    await this.favoritesService.addArtist(id);

    return addedArtist;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteArtist(@Param('id', validateUuidPipe) id: string): Promise<void> {
    await this.favoritesService.deleteArtist(id);
  }

  /**
   * @throws {HttpException}
   */
  @Post('track/:id')
  @ApiResponse({ status: HttpStatus.CREATED, type: Track })
  async addTrack(@Param('id', validateUuidPipe) id: string): Promise<Track> {
    const addedTrack = await this.getEntity(this.trackService, id);

    await this.throwExceptionIfAlreadyAdded('Track', id);
    await this.favoritesService.addTrack(id);

    return addedTrack;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteTrack(@Param('id', validateUuidPipe) id: string): Promise<void> {
    await this.favoritesService.deleteTrack(id);
  }

  /**
   * getEntityOrThrowException
   * @throws {HttpException}
   */
  private async getEntity<
    Service extends AlbumService | ArtistService | TrackService,
    Entity extends Awaited<ReturnType<Service['read']>>,
  >(
    service: Service,
    id: Awaited<ReturnType<Service['read']>>['id'],
  ): Promise<Entity> {
    let entity: Entity;

    try {
      entity = (await service.read(id)) as Entity;
    } catch (reason) {
      if (reason instanceof NotFoundException) {
        throw new HttpException(
          `Entity, with id: ${id}, not exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw reason;
    }

    return entity;
  }

  /**
   * @throws {HttpException}
   */
  private async throwExceptionIfAlreadyAdded<
    Type extends 'Album' | 'Artist' | 'Track',
  >(type: Type, id: string): Promise<void> {
    const isEntityAdded = await this.favoritesService[`has${type}`](id);

    if (isEntityAdded) {
      throw new HttpException(
        `Entity, with id: ${id}, already added`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
