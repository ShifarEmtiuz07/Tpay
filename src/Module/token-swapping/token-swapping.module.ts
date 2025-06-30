import { Module } from '@nestjs/common';
import { TokenSwappingService } from './token-swapping.service';
import { TokenSwappingController } from './token-swapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from '../liquidity-pool-management/entities/pool.entity';
import { TokenSwapping } from './entities/token-swapping.entity';
import { Stake } from '../yield-farming/entities/stake.entity';
import { AuthModule } from '../auth/auth.module';
import { YieldFarmingService } from '../yield-farming/yield-farming.service';
import { YieldFarming } from '../yield-farming/entities/yield-farming.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSwapping, Pool,Stake,YieldFarming,User]), AuthModule],
  controllers: [TokenSwappingController],
  providers: [TokenSwappingService,YieldFarmingService],
})
export class TokenSwappingModule {}
