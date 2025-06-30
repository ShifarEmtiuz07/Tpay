
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pool } from './pool.entity';
import { User } from 'src/Module/users/entities/user.entity';


@Entity('liquidity')
export class Liquidity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User,user=> user.liquidity, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  amountA: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  amountB: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  share: number;

  @ManyToOne(() => Pool, (pool) => pool.liquidity)
  pool: Pool;
}
