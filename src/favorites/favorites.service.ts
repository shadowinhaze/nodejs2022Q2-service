import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FavoritesResponse } from './favorites.dto';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';
import { FavsResMsg, ResCode } from 'src/shared/constants/constants';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger();
  constructor(
    @Inject('FAVORITES_REPOSITORY')
    private favoritesRepository: Repository<Favorites>,
    private sharedService: SharedService,
  ) {
    this.check();
  }

  private async check(): Promise<void> {
    const check = await this.getDB();

    if (check) return;

    const initial = this.favoritesRepository.create();
    await this.favoritesRepository.save(initial);
  }

  private async getDB(): Promise<Favorites> {
    return await this.favoritesRepository
      .createQueryBuilder('favorites')
      .select('favorites')
      .getOne();
  }

  private async findFavoriteItemById(
    db: Favorites,
    entity: Entity,
    id: string,
  ): Promise<void> {
    const searchItem = db[entity].find((item) => item === id);

    if (!searchItem)
      throw new HttpException(
        `${entity.slice(0, -1)} ${FavsResMsg.notFavoriteEntity}`,
        ResCode.notFound,
      );
  }

  async getFavs(): Promise<FavoritesResponse> {
    await this.check();

    const result: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const inDb = await this.getDB();

    await Promise.all(
      Object.entries(inDb).map(async ([DBKey, DBArr]) => {
        if (DBKey === 'id') return;

        result[DBKey] = await Promise.all(
          DBArr.map(async (itemID) => {
            return await this.sharedService.getItemById(
              DBKey as Entity,
              itemID,
            );
          }),
        );
      }),
    );

    return result as FavoritesResponse;
  }

  async addItem(entity: Entity, id: string): Promise<void> {
    await this.check();

    try {
      await this.sharedService.getItemById(entity, id);
    } catch (e) {
      if (e) {
        throw new HttpException(
          `${entity.slice(0, -1)} ${FavsResMsg.notFound}`,
          ResCode.notFoundForFavs,
        );
      }
    }

    const inDB = await this.getDB();

    if (inDB[entity].includes(id))
      throw new HttpException(
        `${entity.slice(0, -1)} is already favorite`,
        ResCode.alreadyExist,
      );

    const updatedArray = [...inDB[entity], id];

    await this.favoritesRepository.update(inDB.id, {
      [entity]: updatedArray,
    });
  }

  async deleteItem(entity: Entity, id: string): Promise<void> {
    await this.check();
    const inDB = await this.getDB();

    await this.findFavoriteItemById(inDB, entity, id);

    const updatedArray = inDB[entity].filter((itemId) => itemId !== id);

    await this.favoritesRepository.update(inDB.id, {
      [entity]: updatedArray,
    });
  }
}
