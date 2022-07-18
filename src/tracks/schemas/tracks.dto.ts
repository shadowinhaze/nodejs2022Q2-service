import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor({ name, duration, artistId, albumId }: CreateTrackDto) {
    this.id = randomUUID();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
  }
}

// ==== DTO ====
export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}
