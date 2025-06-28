import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { UsersModule } from './Module/users/users.module';
import { AuthModule } from './Module/auth/auth.module';
import { TokenManagementModule } from './Module/token-management/token-management.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),DatabaseModule,UsersModule,AuthModule,TokenManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
