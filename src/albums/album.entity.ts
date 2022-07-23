import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('int')
  year!: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
}
