
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pool } from './pool.entity';
import { User } from 'src/Module/users/entities/user.entity';


@Entity('liquidity')
export class Liquidity {
  @PrimaryGeneratedColumn()
  id: number;



  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  amountA: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  amountB: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  share: number;

  @ManyToOne(() => Pool, (pool) => pool.liquidity)
  pool: Pool;
}
