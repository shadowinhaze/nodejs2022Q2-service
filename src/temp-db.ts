import { Album } from './albums/album.entity';
import { Artist } from './artists/schemas/artists.dto';
import { Favorites } from './favorites/schemas/favorites.dto';
import { Track } from './tracks/track.entity';

const nullArtist = new Artist('Dua Lipa', true);

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
  [Entity.artists]: [nullArtist],
};

export const FavoritesDB: Favorites = {
  [Entity.artists]: [],
  [Entity.albums]: [],
  [Entity.tracks]: [],
};
