import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tracksProviders } from './tracks.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...tracksProviders, TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
