import { HttpException, Injectable } from '@nestjs/common';
import { AlbumResMsg, ResCode } from 'src/common/constants/constants';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './schemas/albums.dto';
import { ALBUMS } from './temp-db/albums-temp-db';

@Injectable()
export class AlbumsService {
  private albumsDB = ALBUMS;

  getAlbums(): Album[] {
    return this.albumsDB;
  }

  getItemById(id: string): Album {
    return this.getAlbumFromDB(id);
  }

  addAlbum(newAlbum: CreateAlbumDto): Album {
    const album = new Album(newAlbum);
    this.albumsDB.push(album);

    return album;
  }

  updateAlbum(id: string, albumInfo: UpdateAlbumDto): Album {
    const album = this.getAlbumFromDB(id);

    Object.entries(albumInfo).forEach(([key, value]) => {
      album[key] = value;
    });

    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    this.getAlbumFromDB(id);

    this.albumsDB = this.albumsDB.filter((album) => album.id !== id);
  }

  private getAlbumFromDB(id: string): Album {
    const album = this.albumsDB.find((album) => album.id === id);
    if (!album) throw new HttpException(AlbumResMsg.notFound, ResCode.notFound);

    return album;
  }
}
