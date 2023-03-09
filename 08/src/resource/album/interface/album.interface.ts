import { ArtistInterface } from '../../artist/interface/artist.interface';

export interface AlbumInterface {
  id: string;
  name: string;
  year: number;
  artistId: ArtistInterface['id'] | null;
}
