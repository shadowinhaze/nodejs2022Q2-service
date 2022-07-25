import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { SharedService } from 'src/shared/shared.service';
import { ArtistsController } from './artists.controller';
import { artistsProviders } from './artists.providers';
import { ArtistsService } from './artists.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => SharedModule)],
  controllers: [ArtistsController],
  providers: [...artistsProviders, ArtistsService, SharedService],
})
export class ArtistsModule {}
