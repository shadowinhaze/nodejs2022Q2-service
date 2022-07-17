import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [SharedModule],
})
export class TracksModule {}
