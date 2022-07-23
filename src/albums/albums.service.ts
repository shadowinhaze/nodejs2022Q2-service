import { Injectable, Inject } from '@nestjs/common';
import { CollectionItem } from 'src/shared/collection-item';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
// export class AlbumsService {
// TO DO
//   async deleteAlbum(id: string): Promise<void> {
//     this.sharedService.deleteItemById(Entity.albums, id);

//     this.sharedService.cleanCollectionsAfterItemDeletion(
//       Entity.albums,
//       Entity.tracks,
//       id,
//     );
//   }
// }
export class AlbumsService extends CollectionItem<Album> {
  constructor(
    @Inject('ALBUM_REPOSITORY') private albumsRepository: Repository<Album>,
  ) {
    super(albumsRepository);
  }
}
