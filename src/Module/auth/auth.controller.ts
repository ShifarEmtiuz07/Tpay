// src/auth/auth.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wallet-login')
   walletLogin(@Body() dto: CreateAuthDto) {
    return this.authService.login(dto.walletAddress);
  }

//   @Get('nonce/:walletAddress')
// async getNonce(@Param('walletAddress') walletAddress: string) {
//   return this.authService.generateNonce(walletAddress);
// }
}
