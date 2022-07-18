import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [SharedModule],
})
export class AlbumsModule {}
