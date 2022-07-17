import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Album } from 'src/albums/schemas/albums.dto';
import { Artist } from 'src/artists/schemas/artists.dto';
import { ResCode, ResMsg } from 'src/shared/constants/constants';
import { Entity, FavoritesDB, TempDB } from 'src/temp-db';
import { Track } from 'src/tracks/schemas/tracks.dto';
import { User } from 'src/users/schemas/user.dto';

enum InnerEntity {
  artists = 'artistId',
  albums = 'albumId',
}

type ItemPayload = Artist | Album | Track | User;

@Injectable()
export class SharedService {
  private readonly logger = new Logger(SharedService.name);
  private DB = TempDB;
  private FavsDB = FavoritesDB;

  getCollectionByName(entity: Entity) {
    return this.DB[entity];
  }

  getItemById(entity: Entity, id: string) {
    const item = this.DB[entity].find((item) => item.id === id);

    if (!item)
      throw new HttpException(
        `${entity.slice(0, -1)} ${ResMsg.notFound}`,
        ResCode.notFound,
      );

    return item;
  }

  addItem(entity: Entity, payload: ItemPayload) {
    this.DB[entity].push(payload);
  }

  deleteItemById(entity: Entity, id: string): void {
    this.getItemById(entity, id);

    this.DB[entity] = this.DB[entity].filter((item) => item.id !== id);
  }

  cleanCollectionsAfterItemDeletion(
    delEntity: Entity,
    inEntity: Entity,
    id: string,
  ): void {
    this.DB[inEntity] = this.DB[inEntity].map((item) => {
      if (item[InnerEntity[delEntity]] === id) {
        return { ...item, [InnerEntity[delEntity]]: null };
      }

      return item;
    });

    this.cleanFavoritesAfterItemDeletion(delEntity, id);
  }

  cleanFavoritesAfterItemDeletion(entity: Entity, itemID: string): void {
    const itemIdxInFavs = this.FavsDB[entity].findIndex(
      (item: string) => item === itemID,
    );

    if (itemIdxInFavs >= 0) {
      this.FavsDB[entity].splice(itemIdxInFavs, 1);
    }
  }
}
