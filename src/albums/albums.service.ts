import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './schemas/albums.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly sharedService: SharedService) {}

  getAlbums(): Album[] {
    return this.sharedService.getCollectionByName(Entity.albums) as Album[];
  }

  getItemById(id: string): Album {
    return this.sharedService.getItemById(Entity.albums, id) as Album;
  }

  addAlbum(newAlbum: CreateAlbumDto): Album {
    const album = new Album(newAlbum);

    this.sharedService.addItem(Entity.albums, album);

    return album;
  }

  updateAlbum(id: string, albumInfo: UpdateAlbumDto): Album {
    const album = this.sharedService.getItemById(Entity.albums, id);

    Object.entries(albumInfo).forEach(([key, value]) => {
      album[key] = value;
    });

    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    this.sharedService.deleteItemById(Entity.albums, id);

    this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.albums,
      Entity.tracks,
      id,
    );
  }
}
