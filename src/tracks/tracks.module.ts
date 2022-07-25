import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { SharedModule } from 'src/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';
import { tracksProviders } from './tracks.providers';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => SharedModule)],
  providers: [...tracksProviders, TracksService, SharedService],
  controllers: [TracksController],
})
export class TracksModule {}
