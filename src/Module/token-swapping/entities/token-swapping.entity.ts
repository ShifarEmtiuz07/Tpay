import { Pool } from 'src/Module/liquidity-pool-management/entities/pool.entity';
import { User } from 'src/Module/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class TokenSwapping {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fromToken: string;

  @Column()
  toToken: string;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  inputAmount: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  outputAmount: number;

  @CreateDateColumn()
  createdAt: Date;

@ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Pool)
  pool: Pool;
}
