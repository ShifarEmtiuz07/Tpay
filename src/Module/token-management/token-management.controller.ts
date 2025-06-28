import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenManagementService } from './token-management.service';
import { CreateTokenDto } from './dto/create-token-management.dto';




@Controller('token-management')
export class TokenManagementController {
  constructor(private readonly tokenManagementService: TokenManagementService) {}



  @Post()
  async create(@Body() dto: CreateTokenDto) {
    //console.log('Creating token with controller:', dto);
    return this.tokenManagementService.create(dto);
  }

  @Get()
  async getAll() {
    return this.tokenManagementService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.tokenManagementService.findById(id);
  }

  @Get('/address')
  async getByAddress(@Query('address') address: string) {
    return this.tokenManagementService.findByAddress(address);
  }
}
