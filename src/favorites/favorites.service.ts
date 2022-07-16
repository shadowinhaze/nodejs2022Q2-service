import { HttpException, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavsResMsg, ResCode } from 'src/common/constants/constants';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntity, FavoritesResponse } from './schemas/favorites.dto';
import { FAVS } from './temp-db/favorites-temp-db';

@Injectable()
export class FavoritesService {
  private favsDB = FAVS;

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  getFavs(): FavoritesResponse {
    const result = {};

    Object.entries(this.favsDB).forEach(([DBKey, DBArr]) => {
      result[DBKey] = DBArr.map((itemID) => {
        return this[`${DBKey}Service`].getItemById(itemID);
      });
    });

    return result as FavoritesResponse;
  }

  addItem(entity: FavoritesEntity, id: string): void {
    try {
      this[`${entity}Service`].getItemById(id);
      this.favsDB[entity].push(id);
    } catch (e) {
      if (e)
        throw new HttpException(
          `${entity.slice(0, -1)} ${FavsResMsg.notFound}`,
          ResCode.notFoundForFavs,
        );
    }
  }

  deleteItem(entity: FavoritesEntity, id: string): void {
    this.findFavoriteItemById(entity, id);
    this.favsDB[entity] = this.favsDB[entity].filter((itemId) => itemId !== id);
  }

  private findFavoriteItemById(entity: FavoritesEntity, id: string): void {
    const searchItem = this.favsDB[entity].find((item) => item === id);

    if (!searchItem)
      throw new HttpException(
        `${entity.slice(0, -1)} ${FavsResMsg.notFavoriteEntity}`,
        ResCode.notFound,
      );
  }
}
