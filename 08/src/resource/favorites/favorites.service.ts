import { Injectable } from '@nestjs/common';
import { EntityStorage } from '../../common/entity-storage';
import { Album } from '../album/entity/album.entity';
import { Artist } from '../artist/entity/artist.entity';
import { Track } from '../track/entity/track.entity';
import { Favorites } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  private readonly albumIdStorage = new EntityStorage<Pick<Album, 'id'>>();
  private readonly artistIdStorage = new EntityStorage<Pick<Artist, 'id'>>();
  private readonly trackIdStorage = new EntityStorage<Pick<Track, 'id'>>();

  async readAll(): Promise<Favorites> {
    const favorites: Favorites = {
      albums: this.albumIdStorage.get().map((albumId) => albumId.id),
      artists: this.artistIdStorage.get().map((artistId) => artistId.id),
      tracks: this.trackIdStorage.get().map((trackId) => trackId.id),
    };

    return favorites;
  }

  async addAlbum(id: Album['id']): Promise<Album['id']> {
    const [{ id: addedAlbumId }] = this.albumIdStorage.set({ id });

    return addedAlbumId;
  }

  async hasAlbum(id: Album['id']): Promise<boolean> {
    return this.albumIdStorage.has(id);
  }

  /**
   * @throws {NotFoundException}
   */
  async deleteAlbum(id: Album['id']): Promise<Album['id']> {
    const [{ id: deletedAlbumId }] = this.albumIdStorage.delete(id);

    return deletedAlbumId;
  }

  async addArtist(id: Artist['id']): Promise<Artist['id']> {
    const [{ id: addedArtistId }] = this.artistIdStorage.set({ id });

    return addedArtistId;
  }

  async hasArtist(id: Artist['id']): Promise<boolean> {
    return this.artistIdStorage.has(id);
  }

  /**
   * @throws {NotFoundException}
   */
  async deleteArtist(id: Artist['id']): Promise<Artist['id']> {
    const [{ id: deletedArtistId }] = this.artistIdStorage.delete(id);

    return deletedArtistId;
  }

  async addTrack(id: Track['id']): Promise<Track['id']> {
    const [{ id: addedTrackId }] = this.trackIdStorage.set({ id });

    return addedTrackId;
  }

  async hasTrack(id: Track['id']): Promise<boolean> {
    return this.trackIdStorage.has(id);
  }

  /**
   * @throws {NotFoundException}
   */
  async deleteTrack(id: Track['id']): Promise<Track['id']> {
    const [{ id: deletedTrackId }] = this.trackIdStorage.delete(id);

    return deletedTrackId;
  }
}
