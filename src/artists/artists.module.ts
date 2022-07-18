import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [SharedModule],
})
export class ArtistsModule {}
