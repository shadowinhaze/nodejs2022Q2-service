import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionItem } from 'src/shared/collection-item';
import { Track } from './track.entity';

@Injectable()
export class TracksService extends CollectionItem<Track> {
  constructor(
    @Inject('TRACK_REPOSITORY') private trackRepository: Repository<Track>,
  ) {
    super(trackRepository);
  }
}
