import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateTokenSwappingDto } from './dto/update-token-swapping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSwapping } from './entities/token-swapping.entity';
import { Repository } from 'typeorm';
import { Pool } from '../liquidity-pool-management/entities/pool.entity';
import { SwapTokensDto } from './dto/create-token-swapping.dto';
import { User } from '../users/entities/user.entity';
import { Stake } from '../yield-farming/entities/stake.entity';
import { YieldFarmingService } from '../yield-farming/yield-farming.service';

@Injectable()
export class TokenSwappingService {

  private readonly FEE_RATE = 0.003;

    constructor(
    @InjectRepository(TokenSwapping) private swapRepo: Repository<TokenSwapping>,
    @InjectRepository(Pool) private poolRepo: Repository<Pool>,
      @InjectRepository(Stake) private stakeRepo: Repository<Stake>,
         @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly yieldFarmingService: YieldFarmingService,
  ) {}

async swap(dto: SwapTokensDto, reqUser: User) {
    const { poolId, fromToken, amount } = dto;

    const pool = await this.poolRepo.findOne({ where: { id: poolId } });
    if (!pool) throw new NotFoundException('Pool not found');

      const user= await this.userRepository.findOne({ where: { walletAddress:reqUser.walletAddress } });
       if (!user) throw new NotFoundException('User not found');

    let inputReserve, outputReserve;

    const isTokenA = fromToken === pool.tokenA;
    const tokenIn = isTokenA ? pool.tokenA : pool.tokenB;
    const tokenOut = isTokenA ? pool.tokenB : pool.tokenA;

    inputReserve = isTokenA ? pool.reserveA : pool.reserveB;
    outputReserve = isTokenA ? pool.reserveB : pool.reserveA;

    if (inputReserve <= 0 || outputReserve <= 0) {
      throw new BadRequestException('Insufficient pool liquidity');
    }

    const amountInWithFee = amount * (1 - this.FEE_RATE);
    const numerator = amountInWithFee * outputReserve;
    const denominator = inputReserve + amountInWithFee;

    const amountOut = numerator / denominator;

    if (isTokenA) {
      pool.reserveA += amount;
      pool.reserveB -= amountOut;
    } else {
      pool.reserveB += amount;
      pool.reserveA -= amountOut;
    }


    await this.poolRepo.save(pool);

    const swap = this.swapRepo.create({
      user,
      pool,
      fromToken: tokenIn,
      toToken: tokenOut,
      inputAmount: amount,
      outputAmount: amountOut,
    });

    await this.swapRepo.save(swap);


    
    const tradingFee = amount * this.FEE_RATE;
    const stakes = await this.stakeRepo.find({ where: { yieldFarming: { lpTokenAddress: String(pool.id) }  }, relations: ['yieldFarming'], });
    
    const totalStake = stakes.reduce((sum, s) => sum + s.amount, 0);
   
    for (const stake of stakes) {
      const share = stake.amount / totalStake;
    
      const feeShare = share * tradingFee;
      
      await this.yieldFarmingService.addFeeReward(stake.id, feeShare);
    }


    return {
      fromToken: tokenIn,
      toToken: tokenOut,
      input: amount,
      output: amountOut,
      fee: this.FEE_RATE * 100 + '%',
    };
  }

  async getAll() {
    return this.swapRepo.find({ relations: ['pool', 'user'] });
  }
}
