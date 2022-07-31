import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('int')
  duration!: number;

  @ManyToOne(() => Artist, (artist: Artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Album, (album: Album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.tracks, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;
}
