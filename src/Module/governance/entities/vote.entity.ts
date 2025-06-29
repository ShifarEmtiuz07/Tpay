import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proposal } from './proposal.entity';


@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;



  @Column()
  voterAddress: string;

  @Column()
  vote: 'yes' | 'no';

  @Column()
  weight: number;

@ManyToOne(() => Proposal)
  proposal: Proposal;
}
