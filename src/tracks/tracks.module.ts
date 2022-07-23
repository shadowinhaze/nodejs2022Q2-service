import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { SharedModule } from 'src/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';
import { tracksProviders } from './tracks.providers';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [...tracksProviders, TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
