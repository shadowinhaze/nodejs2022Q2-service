import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';
import { CreateTrackDto, Track, UpdateTrackDto } from './schemas/tracks.dto';

@Injectable()
export class TracksService {
  constructor(private readonly sharedService: SharedService) {}

  getTracks(): Track[] {
    return this.sharedService.getCollectionByName(Entity.tracks) as Track[];
  }

  getItemById(id: string): Track {
    return this.sharedService.getItemById(Entity.tracks, id);
  }

  addTrack(newTrack: CreateTrackDto): Track {
    const track = new Track(newTrack);

    this.sharedService.addItem(Entity.tracks, track);

    return track;
  }

  updateTrack(id: string, trackInfo: UpdateTrackDto): Track {
    const track = this.sharedService.getItemById(Entity.tracks, id);

    Object.entries(trackInfo).forEach(([key, value]) => {
      track[key] = value;
    });

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    this.sharedService.deleteItemById(Entity.tracks, id);

    this.sharedService.cleanFavoritesAfterItemDeletion(Entity.tracks, id);
  }
}
