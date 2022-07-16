import { HttpException, Injectable } from '@nestjs/common';
import { ArtistResMsg, ResCode } from 'src/common/constants/constants';
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
} from './schemas/artists.dto';
import { ARTISTS } from './temp-db/artists-temp-db';

@Injectable()
export class ArtistsService {
  private artistsDB = ARTISTS;

  getArtists(): Artist[] {
    return this.artistsDB;
  }

  getItemById(id: string): Artist {
    return this.getArtistFromDB(id);
  }

  addArtist({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist(name, grammy);
    this.artistsDB.push(artist);

    return artist;
  }

  updateArtist(id: string, artistInfo: UpdateArtistDto): Artist {
    const artist = this.getArtistFromDB(id);

    Object.entries(artistInfo).forEach(([key, value]) => {
      artist[key] = value;
    });

    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    this.getArtistFromDB(id);

    this.artistsDB = this.artistsDB.filter((artist) => artist.id !== id);
  }

  private getArtistFromDB(id: string): Artist {
    const artist = this.artistsDB.find((artist) => artist.id === id);
    if (!artist)
      throw new HttpException(ArtistResMsg.notFound, ResCode.notFound);

    return artist;
  }
}
