import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateYieldFarmingDto } from './dto/create-yield-farming.dto';
import { UpdateYieldFarmingDto } from './dto/update-yield-farming.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stake } from './entities/stake.entity';
import { YieldFarming } from './entities/yield-farming.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class YieldFarmingService {

    constructor(
    @InjectRepository(Stake) private stakeRepo: Repository<Stake>,
    @InjectRepository(YieldFarming) private farmRepo: Repository<YieldFarming>,
  ) {}

  async stake(user: User, farmId: string, amount: number) {
    const farm = await this.farmRepo.findOne({ where: { id: farmId } });
    if (!farm) throw new NotFoundException('Farm not found');

    const now = new Date();
    const stake = this.stakeRepo.create({
      user,
      yieldFarming: farm,
      amount,
      stakeTime: now,
      lastClaimedTime: now,
      feeReward: 0,
    });
    return this.stakeRepo.save(stake);
  }

  async claim(user: User, stakeId: string) {
    const stake = await this.stakeRepo.findOne({ where: { id: stakeId }, relations: ['farm', 'user'] });
    if (!stake || stake.user.id !== user.id) throw new NotFoundException('Stake not found');

    const now = new Date();
    const secondsElapsed = (now.getTime() - new Date(stake.lastClaimedTime).getTime()) / 1000;
    const reward = stake.amount * secondsElapsed * stake.yieldFarming.rewardRate;

    const totalTPAY = reward;
    const totalFees = stake.feeReward;

    stake.lastClaimedTime = now;
    stake.feeReward = 0;
    await this.stakeRepo.save(stake);

    return { tpayReward: totalTPAY, tradingFeeReward: totalFees };
  }

  async addFeeReward(stakeId: string, feeAmount: number) {
    const stake = await this.stakeRepo.findOne({ where: { id: stakeId } });
    if (stake) {
      stake.feeReward += feeAmount;
      await this.stakeRepo.save(stake);
    }
  }

  async farms() {
    return this.farmRepo.find();
  }
}
