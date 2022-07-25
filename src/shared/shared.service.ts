import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { dataSource } from 'src/database/data-source';
import { Favorites } from 'src/favorites/favorites.entity';
import { ResCode, ResMsg } from 'src/shared/constants/constants';
import { Entity } from 'src/temp-db';
import { Track } from 'src/tracks/track.entity';

enum InnerEntity {
  artists = 'artistId',
  albums = 'albumId',
}

const EntityMap = {
  [Entity.tracks]: Track,
  [Entity.albums]: Album,
  [Entity.artists]: Artist,
};

@Injectable()
export class SharedService {
  private readonly logger = new Logger(SharedService.name);

  async getItemById(entity: Entity, id: string) {
    const item = await dataSource.manager.findOneBy(EntityMap[entity], { id });

    if (!item)
      throw new HttpException(
        `${entity.slice(0, -1)} ${ResMsg.notFound}`,
        ResCode.notFound,
      );

    return item;
  }

  async cleanCollectionsAfterItemDeletion(
    delEntity: Entity,
    inEntity: Entity,
    id: string,
  ): Promise<void> {
    await dataSource.manager.update(
      EntityMap[inEntity],
      { [InnerEntity[delEntity]]: id },
      { [InnerEntity[delEntity]]: null },
    );

    await this.cleanFavoritesAfterItemDeletion(delEntity, id);
  }

  async cleanFavoritesAfterItemDeletion(
    entity: Entity,
    itemID: string,
  ): Promise<void> {
    const FavDB = await dataSource
      .createQueryBuilder()
      .select('favorites')
      .from(Favorites, 'favorites')
      .getOne();

    const updatable = FavDB[entity].filter((favItemId) => favItemId !== itemID);

    await dataSource.manager.update(Favorites, FavDB.id, {
      [entity]: updatable,
    });
  }
}
