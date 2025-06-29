
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Liquidity } from './liquidity.entity';
// import { Token } from '../../token/token.entity';


@Entity('pools')
export class Pool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenA: string; // token address

  @Column()
  tokenB: string;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  reserveA: number;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  reserveB: number;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  totalShares: number;

  @OneToMany(() => Liquidity, (liquidity) => liquidity.pool)
  liquidity: Liquidity[];
}
