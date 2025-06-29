import { Module } from '@nestjs/common';
import { YieldFarmingService } from './yield-farming.service';
import { YieldFarmingController } from './yield-farming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stake } from './entities/stake.entity';
import { YieldFarming } from './entities/yield-farming.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Stake, YieldFarming])],
  controllers: [YieldFarmingController],
  providers: [YieldFarmingService],
})
export class YieldFarmingModule {}
