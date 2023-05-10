import { AlbumInterface } from '../../album/interface/album.interface';
import { ArtistInterface } from '../../artist/interface/artist.interface';

export interface TrackInterface {
  id: string;
  name: string;
  artistId: ArtistInterface['id'] | null;
  albumId: AlbumInterface['id'] | null;
  duration: number;
}
