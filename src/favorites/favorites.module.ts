import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedModule } from 'src/shared/shared.module';
import { favoritesProviders } from './favorites.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [...favoritesProviders, FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
