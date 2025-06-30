import { User } from 'src/Module/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { YieldFarming } from './yield-farming.entity';
import { use } from 'passport';

@Entity('stakes')
export class Stake {
  @PrimaryGeneratedColumn() 
   id: string;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  amount: number;

  @Column()
  stakeTime: Date;

  @Column()
  lastClaimedTime: Date;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  feeReward: number;

  @ManyToOne(() => User,(use) => use.stakes, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => YieldFarming,(yieldFarming)=> yieldFarming.stakes, { nullable: true, onDelete: 'SET NULL' } )
  yieldFarming: YieldFarming;
}
