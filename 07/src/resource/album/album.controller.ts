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
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entity/album.entity';

@Controller('album')
@ApiTags('Albums')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Album })
  async create(@Body() body: CreateAlbumDto): Promise<Album> {
    const createdAlbum = await this.albumService.create(body);

    return createdAlbum;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Album, isArray: true })
  async readAll(): Promise<Album[]> {
    const albums = await this.albumService.readAll();

    return albums;
  }

  /**
   * @throws {NotFoundException}
   */
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  async read(@Param('id', validateUuidPipe) id: string): Promise<Album> {
    const album = await this.albumService.read(id);

    return album;
  }

  /**
   * @throws {NotFoundException}
   */
  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  async update(
    @Param('id', validateUuidPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    const updatedAlbum = await this.albumService.update(id, body);

    return updatedAlbum;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param('id', validateUuidPipe) id: string): Promise<void> {
    try {
      await this.favoritesService.deleteAlbum(id);
    } catch (reason) {
      if (!(reason instanceof NotFoundException)) {
        throw reason;
      }
    }

    await this.albumService.delete(id);
    await this.trackService.deleteAlbumFromTracks(id);
  }
}
