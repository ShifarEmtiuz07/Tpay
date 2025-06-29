import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { RemoveLiquidityDto } from './dto/remove-liquidity.dto';
import { AddLiquidityDto } from './dto/add-liquidity.dto';


@Controller('liquidity-pool-management')
export class LiquidityPoolManagementController {
  constructor(private readonly liquidityPoolManagementService: LiquidityPoolManagementService) {}

  @Post()
  create(@Body() dto: CreatePoolDto) {
    return this.liquidityPoolManagementService.createPool(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('add')
  add(@Body() dto: AddLiquidityDto, @Request() req) {
    return this.liquidityPoolManagementService.addLiquidity(dto, req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Body() dto: RemoveLiquidityDto, @Request() req) {
    return this.liquidityPoolManagementService.removeLiquidity(dto, req.user);
  }

  @Get()
  findAll() {
    return this.liquidityPoolManagementService.findAll();
  }
}
