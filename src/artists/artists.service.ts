import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionItem } from 'src/shared/collection-item';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService extends CollectionItem<Artist> {
  constructor(
    @Inject('ARTIST_REPOSITORY') private artistRepository: Repository<Artist>,
  ) {
    super(artistRepository);
  }
}
