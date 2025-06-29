import { User } from 'src/Module/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { YieldFarming } from './yield-farming.entity';

@Entity('stakes')
export class Stake {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => YieldFarming)
  yieldFarming: YieldFarming;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  amount: number;

  @Column()
  stakeTime: Date;

  @Column()
  lastClaimedTime: Date;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  feeReward: number;
}
