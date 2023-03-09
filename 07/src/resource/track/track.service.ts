/* eslint "no-param-reassign": ["error", { "props": false }] */
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { EntityStorage } from '../../common/entity-storage';
import { Album } from '../album/entity/album.entity';
import { Artist } from '../artist/entity/artist.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  private readonly trackStorage = new EntityStorage<Track>();

  async create(dto: CreateTrackDto): Promise<Track> {
    const entityToCreate = new Track({
      id: uuid(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    });
    const [createdTrack] = this.trackStorage.set(entityToCreate);

    return createdTrack;
  }

  async readAll(): Promise<Track[]> {
    const tracks = this.trackStorage.get();

    return tracks;
  }

  /**
   * @throws {NotFoundException}
   */
  async read(id: Track['id']): Promise<Track> {
    const [track] = this.trackStorage.get(id);

    return track;
  }

  /**
   * @throws {NotFoundException}
   */
  async update(id: Track['id'], dto: UpdateTrackDto): Promise<Track> {
    const [track, trackIndex] = this.trackStorage.get(id);
    const entityToUpdate = new Track({
      id: track.id,
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.artistId,
      duration: dto.duration,
    });
    const [updatededTrack] = this.trackStorage.set(entityToUpdate, trackIndex);

    return updatededTrack;
  }

  /**
   * @throws {NotFoundException}
   */
  async delete(id: Track['id']): Promise<Track> {
    const [deletedTrack] = this.trackStorage.delete(id);

    return deletedTrack;
  }

  async deleteAlbumFromTracks(id: Album['id']): Promise<void> {
    this.trackStorage.get().forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  async deleteArtistFromTracks(id: Artist['id']): Promise<void> {
    this.trackStorage.get().forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
