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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entity/track.entity';
import { TrackService } from './track.service';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Track })
  async create(@Body() body: CreateTrackDto): Promise<Track> {
    const createdTrack = await this.trackService.create(body);

    return createdTrack;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Track, isArray: true })
  async readAll(): Promise<Track[]> {
    const tracks = await this.trackService.readAll();

    return tracks;
  }

  /**
   * @throws {NotFoundException}
   */
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  async read(@Param('id', validateUuidPipe) id: string): Promise<Track> {
    const track = await this.trackService.read(id);

    return track;
  }

  /**
   * @throws {NotFoundException}
   */
  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  async update(
    @Param('id', validateUuidPipe) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    const updatedTrack = await this.trackService.update(id, body);

    return updatedTrack;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param('id', validateUuidPipe) id: string): Promise<void> {
    try {
      await this.favoritesService.deleteTrack(id);
    } catch (reason) {
      if (!(reason instanceof NotFoundException)) {
        throw reason;
      }
    }

    await this.trackService.delete(id);
  }
}
