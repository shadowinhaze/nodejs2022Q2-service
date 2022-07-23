import { Album } from './albums/album.entity';
import { Artist } from './artists/artist.entity';
import { Favorites } from './favorites/schemas/favorites.dto';
import { Track } from './tracks/track.entity';

export enum Entity {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
  favorites = 'favorites',
  users = 'users',
}

interface ITempDB {
  [Entity.tracks]: Track[];
  [Entity.albums]: Album[];
  [Entity.artists]: Artist[];
}

export const TempDB: ITempDB = {
  [Entity.tracks]: [],
  [Entity.albums]: [],
  [Entity.artists]: [],
};

export const FavoritesDB: Favorites = {
  [Entity.artists]: [],
  [Entity.albums]: [],
  [Entity.tracks]: [],
};
