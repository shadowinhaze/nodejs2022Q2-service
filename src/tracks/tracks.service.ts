import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionItem } from 'src/shared/collection-item';
import { Track } from './track.entity';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';

@Injectable()
export class TracksService extends CollectionItem<Track> {
  constructor(
    @Inject('TRACK_REPOSITORY') private trackRepository: Repository<Track>,
    private readonly sharedService: SharedService,
  ) {
    super(trackRepository);
  }

  async deleteItem(deleteOption): Promise<void> {
    await super.deleteItem(deleteOption);

    await this.sharedService.cleanFavoritesAfterItemDeletion(
      Entity.tracks,
      deleteOption.id,
    );
  }
}
