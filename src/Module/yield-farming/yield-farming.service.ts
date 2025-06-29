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

  async createFarm(createYieldFarmingDto: CreateYieldFarmingDto) {

  try{
        const existingFarm = await this.farmRepo.findOne({ where: { lpTokenAddress: createYieldFarmingDto.lpTokenAddress } });
    if (existingFarm) throw new NotFoundException('Farm with this LP token address already exists');

    const farm = this.farmRepo.create(createYieldFarmingDto);
    return this.farmRepo.save(farm);

  } catch (error) {
    throw new NotFoundException('Error creating farm: ' + error.message); 
  }

  }

  async stake(user: User, farmId: string, amount: number) {
  try{

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

  }catch(error) {
    throw new NotFoundException('Error staking: ' + error.message);
  }

}

  async claim(user: User, stakeId: string) {

    try{

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

    }catch (error) {
      throw new NotFoundException('Error claiming rewards: ' + error.message);
    }

  }

  async addFeeReward(stakeId: string, feeAmount: number) {

    try{
          const stake = await this.stakeRepo.findOne({ where: { id: stakeId } });
    if (stake) {
      stake.feeReward += feeAmount;
      await this.stakeRepo.save(stake);
    }
    }catch (error) {
      throw new NotFoundException('Error adding fee reward: ' + error.message);
    }

  }

  async farms() {
    try{
       return this.farmRepo.find();
    }catch (error) {
      throw new NotFoundException('Error fetching farms: ' + error.message);
    }
   
  }
}
