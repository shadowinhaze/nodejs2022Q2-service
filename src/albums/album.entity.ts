import { Artist } from 'src/artists/artist.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('int')
  year!: number;

  @ManyToOne(() => Artist, (artist: Artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.albums, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;
}
