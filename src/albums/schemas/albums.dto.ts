import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, year, artistId }: CreateAlbumDto) {
    this.id = randomUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }
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
