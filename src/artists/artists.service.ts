import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionItem } from 'src/shared/collection-item';
import { Artist } from './artist.entity';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';

@Injectable()
export class ArtistsService extends CollectionItem<Artist> {
  constructor(
    @Inject('ARTIST_REPOSITORY') private artistRepository: Repository<Artist>,
    private sharedService: SharedService,
  ) {
    super(artistRepository);
  }

  async deleteItem(deleteOption): Promise<void> {
    await super.deleteItem(deleteOption);

    await this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.artists,
      Entity.albums,
      deleteOption.id,
    );

    await this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.artists,
      Entity.tracks,
      deleteOption.id,
    );
  }
}
