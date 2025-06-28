import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  address: string;

  @Column()
  name: string;

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
}
