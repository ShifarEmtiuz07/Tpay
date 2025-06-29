


import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreatePoolDto } from './dto/create-pool.dto';
import { AddLiquidityDto } from './dto/add-liquidity.dto';

import { RemoveLiquidityDto } from './dto/remove-liquidity.dto';
import { Pool } from './entities/pool.entity';
import { Liquidity } from './entities/liquidity.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LiquidityPoolManagementService {
  constructor(
    @InjectRepository(Pool) private poolRepo: Repository<Pool>,
    @InjectRepository(Liquidity) private liquidityRepo: Repository<Liquidity>,
  ) {}

  async createPool(dto: CreatePoolDto) {
    // const { tokenA, tokenB, reserveA, reserveB } = dto;
    // const pool = this.poolRepo.create({
    //   tokenA,
    //   tokenB,
    //   reserveA,
    //   reserveB,
    //   totalShares: 1000,
    // });
    try{
        const pool= await this.poolRepo.create({...dto, totalShares: 1000})
    return this.poolRepo.save(pool);

    }catch(error){
      throw new InternalServerErrorException(error.message);
    }
  
  }

  async addLiquidity(dto: AddLiquidityDto, user: User) {
    const pool = await this.poolRepo.findOne({ where: { id: dto.poolId } });
    if (!pool) throw new NotFoundException('Pool not found');

    // Calculate share
    const share = (dto.amountA / pool.reserveA) * pool.totalShares;

    pool.reserveA += dto.amountA;
    pool.reserveB += dto.amountB;
    pool.totalShares += share;

    await this.poolRepo.save(pool);

    const liquidity = this.liquidityRepo.create({
      pool,
      user,
      amountA: dto.amountA,
      amountB: dto.amountB,
      share,
    });

    return this.liquidityRepo.save(liquidity);
  }

  async removeLiquidity(dto: RemoveLiquidityDto, user: User) {
    const pool = await this.poolRepo.findOne({ where: { id: dto.poolId } });
    if (!pool) throw new NotFoundException('Pool not found');

    const liquidity = await this.liquidityRepo.findOne({
      where: { pool: { id: pool.id }, user: { id: user.id }, share: dto.share },
    });

    if (!liquidity) throw new NotFoundException('Liquidity not found');

    const percent = dto.share / pool.totalShares;

    const amountA = pool.reserveA * percent;
    const amountB = pool.reserveB * percent;

    pool.reserveA -= amountA;
    pool.reserveB -= amountB;
    pool.totalShares -= dto.share;

    await this.poolRepo.save(pool);
    await this.liquidityRepo.remove(liquidity);

    return { withdrawn: { amountA, amountB } };
  }

  async findAllPool() {
    return this.poolRepo.find();
  }

    async findAllLiquidity() {
    return this.liquidityRepo.find();
  }
}
