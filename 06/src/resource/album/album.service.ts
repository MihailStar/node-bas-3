/* eslint "no-param-reassign": ["error", { "props": false }] */
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { EntityStorage } from '../../common/entity-storage';
import { Artist } from '../artist/entity/artist.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entity/album.entity';

@Injectable()
export class AlbumService {
  private readonly albumStorage = new EntityStorage<Album>();

  async create(dto: CreateAlbumDto): Promise<Album> {
    const entityToCreate = new Album({
      id: uuid(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });
    const [createdAlbum] = this.albumStorage.set(entityToCreate);

    return createdAlbum;
  }

  async readAll(): Promise<Album[]> {
    const albums = this.albumStorage.get();

    return albums;
  }

  /**
   * @throws {NotFoundException}
   */
  async read(id: Album['id']): Promise<Album> {
    const [album] = this.albumStorage.get(id);

    return album;
  }

  /**
   * @throws {NotFoundException}
   */
  async update(id: Album['id'], dto: UpdateAlbumDto): Promise<Album> {
    const [album, albumIndex] = this.albumStorage.get(id);
    const entityToUpdate = new Album({
      id: album.id,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });
    const [updatededAlbum] = this.albumStorage.set(entityToUpdate, albumIndex);

    return updatededAlbum;
  }

  /**
   * @throws {NotFoundException}
   */
  async delete(id: Album['id']): Promise<Album> {
    const [deletedAlbum] = this.albumStorage.delete(id);

    return deletedAlbum;
  }

  async deleteArtistFromAlbums(id: Artist['id']): Promise<void> {
    this.albumStorage.get().forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
