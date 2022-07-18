import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [SharedModule],
})
export class FavoritesModule {}
