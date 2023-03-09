import { AlbumInterface } from '../../album/interface/album.interface';
import { ArtistInterface } from '../../artist/interface/artist.interface';
import { TrackInterface } from '../../track/interface/track.interface';

export interface FavoritesInterface {
  artists: ArtistInterface['id'][];
  albums: AlbumInterface['id'][];
  tracks: TrackInterface['id'][];
}
