import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ArtistsController } from './artists.controller';
import { artistsProviders } from './artists.providers';
import { ArtistsService } from './artists.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistsController],
  providers: [...artistsProviders, ArtistsService],
})
export class ArtistsModule {}
