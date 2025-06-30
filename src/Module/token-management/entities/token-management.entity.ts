import { User } from 'src/Module/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn()
  id: string;

  @Column()
  walletAddress: string;

  @Column()
  name: string;

  @Column({nullable: true})
  slug: string;

  @Column()
  symbol: string;

  @Column()
  decimals: number;

  @Column({ type: 'decimal', precision: 30, scale: 10, default: 0 })
  totalSupply: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(()=> User, user => user.tokens, { nullable: true ,onDelete: 'SET NULL' })
  user: User;
}
