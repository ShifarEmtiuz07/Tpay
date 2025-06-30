import { Module } from '@nestjs/common';
import { TokenManagementService } from './token-management.service';
import { TokenManagementController } from './token-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token-management.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Token,User])],
  controllers: [TokenManagementController],
  providers: [TokenManagementService],
})
export class TokenManagementModule {}
