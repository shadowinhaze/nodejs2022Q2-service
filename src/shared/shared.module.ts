import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { albumsProviders } from 'src/albums/albums.providers';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { artistsProviders } from 'src/artists/artists.providers';
import { ArtistsService } from 'src/artists/artists.service';
import { DatabaseModule } from 'src/database/database.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { tracksProviders } from 'src/tracks/tracks.providers';
import { TracksService } from 'src/tracks/tracks.service';
import { SharedService } from './shared.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...tracksProviders,
    ...albumsProviders,
    ...artistsProviders,
    SharedService,
  ],
  exports: [SharedService],
})
export class SharedModule {}
