import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  sector: string;

  @Column()
  owner_name: string;

  @CreateDateColumn()
  created_at: Date;
}
