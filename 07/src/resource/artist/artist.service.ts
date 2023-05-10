import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { EntityStorage } from '../../common/entity-storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  private readonly artistStorage = new EntityStorage<Artist>();

  async create(dto: CreateArtistDto): Promise<Artist> {
    const entityToCreate = new Artist({
      id: uuid(),
      name: dto.name,
      grammy: dto.grammy,
    });
    const [createdArtist] = this.artistStorage.set(entityToCreate);

    return createdArtist;
  }

  async readAll(): Promise<Artist[]> {
    const artists = this.artistStorage.get();

    return artists;
  }

  /**
   * @throws {NotFoundException}
   */
  async read(id: Artist['id']): Promise<Artist> {
    const [artist] = this.artistStorage.get(id);

    return artist;
  }

  /**
   * @throws {NotFoundException}
   */
  async update(id: Artist['id'], dto: UpdateArtistDto): Promise<Artist> {
    const [artist, artistIndex] = this.artistStorage.get(id);
    const entityToUpdate = new Artist({
      id: artist.id,
      name: dto.name,
      grammy: dto.grammy,
    });
    const [updatededArtist] = this.artistStorage.set(
      entityToUpdate,
      artistIndex,
    );

    return updatededArtist;
  }

  /**
   * @throws {NotFoundException}
   */
  async delete(id: Artist['id']): Promise<Artist> {
    const [deletedArtist] = this.artistStorage.delete(id);

    return deletedArtist;
  }
}
