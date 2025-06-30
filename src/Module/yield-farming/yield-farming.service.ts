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
        @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  async stake(reqUser: User, farmId: string, amount: number) {
  try{

     const user= await this.userRepository.findOne({ where: { walletAddress:reqUser.walletAddress } });
       if (!user) throw new NotFoundException('User not found');
    const farm = await this.farmRepo.findOne({ where: { id: farmId } });
    //console.log('Farm found:', farm);
    if (!farm) throw new NotFoundException('Farm not found');

    const now = new Date();
    const stake =await this.stakeRepo.create({
 
      amount,
      stakeTime: now,
      lastClaimedTime: now,
      feeReward: 0,
      user,
      yieldFarming: farm,
    });
    console.log('Stake created:', stake);
    return await this.stakeRepo.save(stake);

  }catch(error) {
    throw new NotFoundException('Error staking: ' + error.message);
  }

}

  async claim(reqUser: User, stakeId: string) {

    try{

      const user = await this.userRepository.findOne({ where: { walletAddress: reqUser.walletAddress } });
       
    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    const stake = await this.stakeRepo.findOne({ where: { id: stakeId },relations: ['yieldFarming', 'user'] }); //relations: ['yieldFarming', 'user']
    
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

        let feeAmounts= Number(feeAmount);
          const stake = await this.stakeRepo.findOne({ where: { id: stakeId } });
           if (!stake) {
      throw new NotFoundException('Stake not found');

    }
    
    //console.log('Adding fee reward:', feeAmount, 'to stake:', stakeId);

    let stakeFeeReward=Number(stake.feeReward);

 
 
    stakeFeeReward+=feeAmounts;
      stake.feeReward = stakeFeeReward;
    const savedStake=  await this.stakeRepo.save(stake);
 
    
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
