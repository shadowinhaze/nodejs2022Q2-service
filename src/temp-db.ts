import { Album } from './albums/schemas/albums.dto';
import { Artist } from './artists/schemas/artists.dto';
import { Favorites } from './favorites/schemas/favorites.dto';
import { Track } from './tracks/schemas/tracks.dto';
import { User } from './users/schemas/user.dto';

const nullUser = new User('testlogin', '12345678');
const nullTrack = new Track({ name: 'testTrack', duration: 123 });
const nullArtist = new Artist('Dua Lipa', true);
const nullAlbum = new Album({ name: 'TestAlbum', year: 1994 });

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
  [Entity.tracks]: [nullTrack],
  [Entity.albums]: [nullAlbum],
  [Entity.artists]: [nullArtist],
};

export const FavoritesDB: Favorites = {
  [Entity.artists]: [],
  [Entity.albums]: [],
  [Entity.tracks]: [],
};

export const UsersDB: User[] = [nullUser];
