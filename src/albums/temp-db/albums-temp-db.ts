import { Album } from '../schemas/albums.dto';

const nullAlbum = new Album({ name: 'TestAlbum', year: 1994 });

export const ALBUMS: Album[] = [nullAlbum];
