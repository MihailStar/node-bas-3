import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { validateUuidPipe } from '../../common/validate-uuid-pipe';
import { AlbumService } from '../album/album.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entity/artist.entity';

@Controller('artist')
@ApiTags('Artists')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Artist })
  async create(@Body() body: CreateArtistDto): Promise<Artist> {
    const createdArtist = await this.artistService.create(body);

    return createdArtist;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Artist, isArray: true })
  async readAll(): Promise<Artist[]> {
    const artists = await this.artistService.readAll();

    return artists;
  }

  /**
   * @throws {NotFoundException}
   */
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  async read(@Param('id', validateUuidPipe) id: string): Promise<Artist> {
    const artist = await this.artistService.read(id);

    return artist;
  }

  /**
   * @throws {NotFoundException}
   */
  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  async update(
    @Param('id', validateUuidPipe) id: string,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    const updatedArtist = await this.artistService.update(id, body);

    return updatedArtist;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param('id', validateUuidPipe) id: string): Promise<void> {
    try {
      await this.favoritesService.deleteArtist(id);
    } catch (reason) {
      if (!(reason instanceof NotFoundException)) {
        throw reason;
      }
    }

    await this.artistService.delete(id);
    await this.albumService.deleteArtistFromAlbums(id);
    await this.trackService.deleteArtistFromTracks(id);
  }
}
