import { Favorites } from 'src/favorites/favorites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('boolean')
  grammy!: boolean;

  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.artists, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;
}
