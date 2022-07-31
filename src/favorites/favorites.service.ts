import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
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
    const check = await this.getFavs();

    if (check) return;

    const initial = this.favoritesRepository.create();
    await this.favoritesRepository.save(initial);
  }

  async getFavs() {
    return (
      await this.favoritesRepository.find({
        relations: {
          artists: true,
          albums: true,
          tracks: true,
        },
      })
    )[0];
  }

  private async findFavoriteItemById(
    db: Favorites,
    entity: Entity,
    searchId: string,
  ): Promise<void> {
    const searchItem = db[entity].find(({ id }) => id === searchId);

    if (!searchItem)
      throw new HttpException(
        `${entity.slice(0, -1)} ${FavsResMsg.notFavoriteEntity}`,
        ResCode.notFound,
      );
  }

  async addItem(entity: Entity, addedID: string): Promise<void> {
    try {
      await this.sharedService.getItemById(entity, addedID);
    } catch (e) {
      if (e) {
        throw new HttpException(
          `${entity.slice(0, -1)} ${FavsResMsg.notFound}`,
          ResCode.notFoundForFavs,
        );
      }
    }

    const inDB = await this.getFavs();

    const addibleItem = await this.sharedService.getItemById(entity, addedID);

    if (inDB[entity].some(({ id }) => id === addedID))
      throw new HttpException(
        `${entity.slice(0, -1)} is already favorite`,
        ResCode.alreadyExist,
      );

    inDB[entity] = [...inDB[entity], addibleItem];

    await this.favoritesRepository.save(inDB);
  }

  async deleteItem(entity: Entity, deletedId: string): Promise<void> {
    const inDB = await this.getFavs();

    await this.findFavoriteItemById(inDB, entity, deletedId);

    inDB[entity] = inDB[entity].filter(({ id }) => id !== deletedId);

    await this.favoritesRepository.save(inDB);
  }
}
