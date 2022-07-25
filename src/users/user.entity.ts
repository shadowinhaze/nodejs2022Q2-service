import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  login: string;

  @Column('text')
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt!: Date;
}
