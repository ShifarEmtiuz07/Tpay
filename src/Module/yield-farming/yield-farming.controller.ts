import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { YieldFarmingService } from './yield-farming.service';
import { CreateYieldFarmingDto } from './dto/create-yield-farming.dto';
import { UpdateYieldFarmingDto } from './dto/update-yield-farming.dto';
import { StakeDto } from './dto/stake.dto';

@Controller('yield-farming')
export class YieldFarmingController {
  constructor(private readonly farmingService: YieldFarmingService) {}

   @Post('stake/:farmId')
  stake(@Param('farmId') farmId: string, @Body() body: StakeDto, @Request() req) {
    return this.farmingService.stake(req.user, farmId, body.amount);
  }

  @Post('claim/:stakeId')
  claim(@Param('stakeId') stakeId: string, @Request() req) {
    return this.farmingService.claim(req.user, stakeId);
  }

  @Get('farms')
  getFarms() {
    return this.farmingService.farms();
  }
}
