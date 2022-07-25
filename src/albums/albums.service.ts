import { Injectable, Inject } from '@nestjs/common';
import { CollectionItem } from 'src/shared/collection-item';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';

@Injectable()
export class AlbumsService extends CollectionItem<Album> {
  constructor(
    @Inject('ALBUM_REPOSITORY') private albumsRepository: Repository<Album>,
    private sharedService: SharedService,
  ) {
    super(albumsRepository);
  }

  async deleteItem(option): Promise<void> {
    await super.deleteItem(option);

    await this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.albums,
      Entity.tracks,
      option.id,
    );
  }
}
