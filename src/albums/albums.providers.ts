import { DataSource } from 'typeorm';
import { Album } from './album.entity';

export const albumsProviders = [
  {
    provide: 'ALBUM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Album),
    inject: ['DATA_SOURCE'],
  },
];
