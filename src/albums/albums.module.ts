import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SharedModule } from 'src/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';
import { albumsProviders } from './albums.providers';

@Module({
  imports: [SharedModule, DatabaseModule],
  controllers: [AlbumsController],
  providers: [...albumsProviders, AlbumsService],
})
export class AlbumsModule {}
