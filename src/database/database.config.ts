import 'dotenv/config';
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
  entities: [User, Track],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: false,
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  synchronize: true,
};

export default databaseConfig;
