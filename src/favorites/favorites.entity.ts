import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', array: true, default: [] })
  artists: Artist[];

  @Column({ type: 'text', array: true, default: [] })
  albums: Album[];

  @Column({ type: 'text', array: true, default: [] })
  tracks: Track[];
}
