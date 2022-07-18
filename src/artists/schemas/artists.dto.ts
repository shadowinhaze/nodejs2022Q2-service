import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(name: string, withGrammy: boolean) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = withGrammy;
  }
}

// ==== DTO ====
export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
