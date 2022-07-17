import { Injectable, Logger } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { Entity } from 'src/temp-db';
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
} from './schemas/artists.dto';

@Injectable()
export class ArtistsService {
  private readonly logger = new Logger(ArtistsService.name);

  constructor(private readonly sharedService: SharedService) {}

  getArtists(): Artist[] {
    return this.sharedService.getCollectionByName(Entity.artists) as Artist[];
  }

  getItemById(id: string): Artist {
    return this.sharedService.getItemById(Entity.artists, id);
  }

  addArtist({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist(name, grammy);

    this.sharedService.addItem(Entity.artists, artist);

    return artist;
  }

  updateArtist(id: string, artistInfo: UpdateArtistDto): Artist {
    const artist = this.sharedService.getItemById(Entity.artists, id);

    Object.entries(artistInfo).forEach(([key, value]) => {
      artist[key] = value;
    });

    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    this.sharedService.deleteItemById(Entity.artists, id);

    this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.artists,
      Entity.albums,
      id,
    );

    this.sharedService.cleanCollectionsAfterItemDeletion(
      Entity.artists,
      Entity.tracks,
      id,
    );
  }
}
