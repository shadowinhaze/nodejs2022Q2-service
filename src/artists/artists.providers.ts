import { DataSource } from 'typeorm';
import { Artist } from './artist.entity';

export const artistsProviders = [
  {
    provide: 'ARTIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: ['DATA_SOURCE'],
  },
];
