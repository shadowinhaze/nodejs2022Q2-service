import { HttpException, Injectable } from '@nestjs/common';
import { FavsResMsg, ResCode } from 'src/shared/constants/constants';
import { SharedService } from 'src/shared/shared.service';
import { Entity, FavoritesDB } from 'src/temp-db';
import { FavoritesResponse } from './schemas/favorites.dto';

@Injectable()
export class FavoritesService {
  private favsDB = FavoritesDB;

  constructor(private readonly sharedService: SharedService) {}

  getFavs(): FavoritesResponse {
    const result = {};

    Object.entries(this.favsDB).forEach(([DBKey, DBArr]) => {
      result[DBKey] = DBArr.map((itemID) => {
        return this.sharedService.getItemById(DBKey as Entity, itemID);
      });
    });

    return result as FavoritesResponse;
  }

  addItem(entity: Entity, id: string): void {
    try {
      this.sharedService.getItemById(entity, id);
    } catch (e) {
      if (e) {
        throw new HttpException(
          `${entity.slice(0, -1)} ${FavsResMsg.notFound}`,
          ResCode.notFoundForFavs,
        );
      }
    }

    if (this.favsDB[entity].includes(id))
      throw new HttpException(
        `${entity.slice(0, -1)} is already favorite`,
        ResCode.alreadyExist,
      );

    this.favsDB[entity].push(id);
  }

  deleteItem(entity: Entity, id: string): void {
    this.findFavoriteItemById(entity, id);
    this.favsDB[entity] = this.favsDB[entity].filter((itemId) => itemId !== id);
  }

  private findFavoriteItemById(entity: Entity, id: string): void {
    const searchItem = this.favsDB[entity].find((item) => item === id);

    if (!searchItem)
      throw new HttpException(
        `${entity.slice(0, -1)} ${FavsResMsg.notFavoriteEntity}`,
        ResCode.notFound,
      );
  }
}
