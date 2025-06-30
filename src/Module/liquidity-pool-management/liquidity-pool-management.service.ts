


import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreatePoolDto } from './dto/create-pool.dto';
import { AddLiquidityDto } from './dto/add-liquidity.dto';

import { RemoveLiquidityDto } from './dto/remove-liquidity.dto';
import { Pool } from './entities/pool.entity';
import { Liquidity } from './entities/liquidity.entity';
import { User } from '../users/entities/user.entity';
import { Token } from '../token-management/entities/token-management.entity';

@Injectable()
export class LiquidityPoolManagementService {
  constructor(
    @InjectRepository(Pool) private poolRepo: Repository<Pool>,
    @InjectRepository(Liquidity) private liquidityRepo: Repository<Liquidity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
  ) {}

  async createPool(dto: CreatePoolDto) {
    try{
    const pool= await this.poolRepo.create({...dto, totalShares: 1000})
    return this.poolRepo.save(pool);

    }catch(error){
      throw new InternalServerErrorException(error.message);
    }
  
  }

  async addLiquidity(dto: AddLiquidityDto, reqUser: User) {

     const user = await this.userRepository.findOne({ where: { walletAddress: reqUser.walletAddress },relations:['tokens'] });
           
        if (!user) {
          throw new NotFoundException('User does not exists');
        }
      //return user;
     // console.log(user);
    
    const pool = await this.poolRepo.findOne({ where: { id: dto.poolId } });
    if (!pool) throw new NotFoundException('Pool not found');


  const amountA = Number(dto.amountA);
  const amountB = Number(dto.amountB);
  let reserveA = Number(pool.reserveA);
  let reserveB = Number(pool.reserveB);
  let totalShares = Number(pool.totalShares);

    // Calculate share
    const share:number = (amountA / reserveA) * totalShares;

    reserveA += amountA;
    reserveB += amountB;
    totalShares += share;

    pool.reserveA = reserveA;
    pool.reserveB = reserveB;
    pool.totalShares = totalShares;

    // console.log(pool.reserveA);
    // console.log( pool.reserveB);

    

   const savedPool= await this.poolRepo.save(pool);
   console.log(savedPool);

    const tokens=await this.tokenRepository.find({where: {walletAddress:user.walletAddress}});
    if (!tokens || tokens.length === 0) {
      throw new NotFoundException('No tokens found for the user');
    }

    for (const token of tokens) {
      token.totalSupply = Number(token.totalSupply);
      if(token.slug=='amountA'){
        token.totalSupply-= amountA;
      }else{
         token.totalSupply-= amountB;
      }
    }

    await this.tokenRepository.save(tokens);

    const liquidity = this.liquidityRepo.create({
      pool,
      user,
      amountA: amountA,
      amountB: amountB,
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
