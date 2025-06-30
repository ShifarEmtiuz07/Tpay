import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { YieldFarmingService } from './yield-farming.service';
import { CreateYieldFarmingDto } from './dto/create-yield-farming.dto';
import { UpdateYieldFarmingDto } from './dto/update-yield-farming.dto';
import { StakeDto } from './dto/stake.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('yield-farming')
export class YieldFarmingController {
  constructor(private readonly farmingService: YieldFarmingService) {}

@Post('farm')
createFarm(@Body() body: CreateYieldFarmingDto) {
  return this.farmingService.createFarm(body);
}

@UseGuards(AuthGuard)
  @Post('stake/:farmId')
  stake(@Param('farmId') farmId: string, @Body() body: StakeDto, @Request() req:any) {
    return this.farmingService.stake(req.user, farmId, body.amount);
  }

  @UseGuards(AuthGuard)
  @Post('claim/:stakeId')
  claim(@Param('stakeId') stakeId: string, @Request() req) {
    return this.farmingService.claim(req.user, stakeId);
  }

  @Get('farms')
  getFarms() {
    return this.farmingService.farms();
  }
}
