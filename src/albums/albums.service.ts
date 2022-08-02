import { Injectable, Inject } from '@nestjs/common';
import { CollectionItem } from 'src/shared/collection-item';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService extends CollectionItem<Album> {
  constructor(
    @Inject('ALBUM_REPOSITORY') private albumsRepository: Repository<Album>,
  ) {
    super(albumsRepository);
  }
}
