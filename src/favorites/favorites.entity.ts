import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id!: string;

  @OneToMany(() => Artist, (artist: Artist) => artist.favorites, {
    cascade: true,
  })
  @JoinColumn()
  artists: Artist[];

  @OneToMany(() => Album, (album: Album) => album.favorites, {
    cascade: true,
  })
  @JoinColumn()
  albums: Album[];

  @OneToMany(() => Track, (track: Track) => track.favorites, {
    cascade: true,
  })
  @JoinColumn()
  tracks: Track[];
}
