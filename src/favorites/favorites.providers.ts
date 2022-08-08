import { DataSource } from 'typeorm';
import { Favorites } from './favorites.entity';

export const favoritesProviders = [
  {
    provide: 'FAVORITES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favorites),
    inject: ['DATA_SOURCE'],
  },
];
