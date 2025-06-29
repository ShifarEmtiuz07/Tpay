import { Module } from '@nestjs/common';
import { TokenSwappingService } from './token-swapping.service';
import { TokenSwappingController } from './token-swapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from '../liquidity-pool-management/entities/pool.entity';
import { TokenSwapping } from './entities/token-swapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSwapping, Pool])],
  controllers: [TokenSwappingController],
  providers: [TokenSwappingService],
})
export class TokenSwappingModule {}
