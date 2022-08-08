import 'dotenv/config';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Track } from 'src/tracks/track.entity';
import { User } from 'src/users/user.entity';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User, Track, Album, Artist, Favorites],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: false,
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  synchronize: true,
};

export default databaseConfig;
