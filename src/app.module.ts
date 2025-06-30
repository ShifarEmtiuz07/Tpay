import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { UsersModule } from './Module/users/users.module';
import { AuthModule } from './Module/auth/auth.module';
import { TokenManagementModule } from './Module/token-management/token-management.module';
import { LiquidityPoolManagementModule } from './Module/liquidity-pool-management/liquidity-pool-management.module';
import { YieldFarmingModule } from './Module/yield-farming/yield-farming.module';
import { GovernanceModule } from './Module/governance/governance.module';
import { TokenSwappingModule } from './Module/token-swapping/token-swapping.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),DatabaseModule,UsersModule,AuthModule,TokenManagementModule,LiquidityPoolManagementModule,YieldFarmingModule,GovernanceModule,TokenSwappingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
