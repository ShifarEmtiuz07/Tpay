import { Module } from '@nestjs/common';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';
import { LiquidityPoolManagementController } from './liquidity-pool-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entities/pool.entity';
import { Liquidity } from './entities/liquidity.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Token } from '../token-management/entities/token-management.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Pool, Liquidity,User,Token]),AuthModule],
  controllers: [LiquidityPoolManagementController],
  providers: [LiquidityPoolManagementService],
})
export class LiquidityPoolManagementModule {}
