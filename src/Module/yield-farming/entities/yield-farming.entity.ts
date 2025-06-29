import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
