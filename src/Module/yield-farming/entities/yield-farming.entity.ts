import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stake } from './stake.entity';

@Entity('farms')
export class YieldFarming {
    @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lpTokenAddress: string;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  rewardRate: number;

  @OneToMany(() => Stake, (stake) => stake.yieldFarming, { nullable: true, onDelete: 'SET NULL' })
  stakes: Stake[] ; 
}
