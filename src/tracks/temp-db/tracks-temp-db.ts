import { Track } from '../schemas/tracks.dto';

const nullTrack = new Track({ name: 'testTrack', duration: 123 });

export const TRACKS: Track[] = [nullTrack];
