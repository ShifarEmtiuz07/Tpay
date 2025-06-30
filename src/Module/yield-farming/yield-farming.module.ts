import { Module } from '@nestjs/common';
import { YieldFarmingService } from './yield-farming.service';
import { YieldFarmingController } from './yield-farming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stake } from './entities/stake.entity';
import { YieldFarming } from './entities/yield-farming.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Stake, YieldFarming,User]),AuthModule],
  controllers: [YieldFarmingController],
  providers: [YieldFarmingService],
})
export class YieldFarmingModule {}
