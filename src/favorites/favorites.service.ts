import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import {
  Entity,
  FavsResMsg,
  ResCode,
  ResMsg,
} from 'src/shared/constants/constants';
import { dataSource } from 'src/database/data-source';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

const EntityMap = {
  [Entity.tracks]: Track,
  [Entity.albums]: Album,
  [Entity.artists]: Artist,
};

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger();
  constructor(
    @Inject('FAVORITES_REPOSITORY')
    private favoritesRepository: Repository<Favorites>,
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

  private async getItemById(entity: Entity, id: string) {
    const item = await dataSource.manager.findOneBy(EntityMap[entity], { id });

    if (!item)
      throw new HttpException(
        `${entity.slice(0, -1)} ${ResMsg.notFound}`,
        ResCode.notFound,
      );

    return item;
  }

  async addItem(entity: Entity, addedID: string): Promise<void> {
    try {
      await this.getItemById(entity, addedID);
    } catch (e) {
      if (e) {
        throw new HttpException(
          `${entity.slice(0, -1)} ${FavsResMsg.notFound}`,
          ResCode.notFoundForFavs,
        );
      }
    }

    const inDB = await this.getFavs();

    const addibleItem = await this.getItemById(entity, addedID);

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
