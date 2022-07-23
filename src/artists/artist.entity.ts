import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('boolean')
  grammy!: boolean;
}
