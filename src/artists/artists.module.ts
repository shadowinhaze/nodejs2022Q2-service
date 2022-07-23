import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { ArtistsController } from './artists.controller';
import { artistsProviders } from './artists.providers';
import { ArtistsService } from './artists.service';

@Module({
  imports: [SharedModule, DatabaseModule],
  controllers: [ArtistsController],
  providers: [...artistsProviders, ArtistsService],
})
export class ArtistsModule {}
