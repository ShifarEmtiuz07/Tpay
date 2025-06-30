import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TokenSwappingService } from './token-swapping.service';
import { SwapTokensDto } from './dto/create-token-swapping.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('token-swapping')
export class TokenSwappingController {
  constructor(private readonly tokenSwappingService: TokenSwappingService) {}

 @UseGuards(AuthGuard)
  @Post()
  swap(@Body() dto: SwapTokensDto, @Request() req) {
    return this.tokenSwappingService.swap(dto, req.user);
  }

  @Get()
  getAll() {
    return this.tokenSwappingService.getAll();
  }
}
