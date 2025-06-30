import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { RemoveLiquidityDto } from './dto/remove-liquidity.dto';
import { AddLiquidityDto } from './dto/add-liquidity.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('liquidity-pool')
export class LiquidityPoolManagementController {
  constructor(private readonly liquidityPoolManagementService: LiquidityPoolManagementService) {}

  @Post()
  create(@Body() dto: CreatePoolDto) {
    return this.liquidityPoolManagementService.createPool(dto);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  add(@Body() dto: AddLiquidityDto, @Request() req) {
    return this.liquidityPoolManagementService.addLiquidity(dto, req.user);
  }

@UseGuards(AuthGuard)
  @Post('remove')
  remove(@Body() dto: RemoveLiquidityDto, @Request() req) {
    return this.liquidityPoolManagementService.removeLiquidity(dto, req.user);
  }

  @Get('all-pools')
  findAllPools() {
    return this.liquidityPoolManagementService.findAllPool();
  }

    @Get('all-liquidities')
  findAllLiquidities() {
    return this.liquidityPoolManagementService.findAllLiquidity();
  }
}
