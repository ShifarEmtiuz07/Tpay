import { Module } from '@nestjs/common';
import { TokenManagementService } from './token-management.service';
import { TokenManagementController } from './token-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token-management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokenManagementController],
  providers: [TokenManagementService],
})
export class TokenManagementModule {}
