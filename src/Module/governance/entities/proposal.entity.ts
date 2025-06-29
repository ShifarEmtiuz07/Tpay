import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('proposals')
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  creatorAddress: string;

  @Column({ default: 0 })
  yesVotes: number;

  @Column({ default: 0 })
  noVotes: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  deadline: Date;
}