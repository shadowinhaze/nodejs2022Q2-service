import { HttpException, Injectable } from '@nestjs/common';
import { ResCode, TrackResMsg } from 'src/common/constants/constants';
import { CreateTrackDto, Track, UpdateTrackDto } from './schemas/tracks.dto';
import { TRACKS } from './temp-db/tracks-temp-db';

@Injectable()
export class TracksService {
  private tracksDB = TRACKS;

  getTracks(): Track[] {
    return this.tracksDB;
  }

  getItemById(id: string): Track {
    return this.getTrackFromDB(id);
  }

  addTrack(newTrack: CreateTrackDto): Track {
    const track = new Track(newTrack);
    this.tracksDB.push(track);

    return track;
  }

  updateTrack(id: string, trackInfo: UpdateTrackDto): Track {
    const track = this.getTrackFromDB(id);

    Object.entries(trackInfo).forEach(([key, value]) => {
      track[key] = value;
    });

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    this.getTrackFromDB(id);

    this.tracksDB = this.tracksDB.filter((track) => track.id !== id);
  }

  private getTrackFromDB(id: string): Track {
    const track = this.tracksDB.find((track) => track.id === id);
    if (!track) throw new HttpException(TrackResMsg.notFound, ResCode.notFound);

    return track;
  }
}
