import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TokenManagementService } from './token-management.service';
import { CreateTokenDto } from './dto/create-token-management.dto';
import { AuthGuard } from '../auth/auth.guard';




@Controller('token-management')
export class TokenManagementController {
  constructor(private readonly tokenManagementService: TokenManagementService) {}



  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateTokenDto, @Req() req: any) {
    //console.log('Creating token with controller:', dto);
    return this.tokenManagementService.create(dto,req.user);
  }

  @Get()
  getAll() {
    return this.tokenManagementService.findAll();
  }

  @Get(':id')
 getById(@Param('id') id: string) {
    return this.tokenManagementService.findById(id);
  }

  @Get('/address')
   getByAddress(@Query('address') address: string) {
    return this.tokenManagementService.findByAddress(address);
  }
}
