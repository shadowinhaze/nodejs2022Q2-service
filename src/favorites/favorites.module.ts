import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { favoritesProviders } from './favorites.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...favoritesProviders, FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
