
import { Liquidity } from 'src/Module/liquidity-pool-management/entities/liquidity.entity';
import { Token } from 'src/Module/token-management/entities/token-management.entity';
import { Stake } from 'src/Module/yield-farming/entities/stake.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  walletAddress: string;

// @Column({  type: 'text',nullable: true })
// nonce: string | null;;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=>Token, token => token.user,)
  tokens: Token[] | null;
  @OneToMany(()=>Liquidity, liquidity => liquidity.user, { nullable: true, onDelete: 'SET NULL' })
  liquidity: Liquidity[] | null;

  @OneToMany(()=>Stake, stake => stake.user, { nullable: true, onDelete: 'SET NULL' } )
  stakes: Stake[] | null;
}
