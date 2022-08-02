import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
