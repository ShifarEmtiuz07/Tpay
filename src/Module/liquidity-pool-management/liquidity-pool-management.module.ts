import { Module } from '@nestjs/common';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';
import { LiquidityPoolManagementController } from './liquidity-pool-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entities/pool.entity';
import { Liquidity } from './entities/liquidity.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Pool, Liquidity])],
  controllers: [LiquidityPoolManagementController],
  providers: [LiquidityPoolManagementService],
})
export class LiquidityPoolManagementModule {}
