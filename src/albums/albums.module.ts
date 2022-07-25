import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseModule } from 'src/database/database.module';
import { albumsProviders } from './albums.providers';
import { SharedModule } from 'src/shared/shared.module';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => SharedModule)],
  controllers: [AlbumsController],
  providers: [...albumsProviders, AlbumsService, SharedService],
})
export class AlbumsModule {}
