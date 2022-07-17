import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from 'src/albums/schemas/albums.dto';
import { Artist } from 'src/artists/schemas/artists.dto';
import { Entity } from 'src/temp-db';
import { Track } from 'src/tracks/schemas/tracks.dto';

export class Favorites {
  [Entity.artists]: string[];
  [Entity.albums]: string[];
  [Entity.tracks]: string[];
}

// ==== DTO ====
export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}

// ==== Response ====

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
