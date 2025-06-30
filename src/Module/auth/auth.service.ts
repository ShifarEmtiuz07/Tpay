// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ethers, verifyMessage } from 'ethers';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { signFunc } from '../../../connect-metamask-account/sign-login.js'; // Adjust the path as needed
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
     @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  

async validateSignature(walletAddress: string, signature: string, nonce: string): Promise<boolean> {
  try {
    const recovered = verifyMessage(nonce, signature);
    return recovered.toLowerCase() === walletAddress.toLowerCase();
  } catch {
    return false;
  }
}

async login(walletAddress: string) {
const credential=await signFunc();
//console.log(credential);
  const user = await this.userService.findByWallet(walletAddress);
  //console.log(user)
  if (!user) throw new UnauthorizedException('No nonce found');

  const isValid =verifyMessage(credential.nonce, credential.signature)
    .toLowerCase() === walletAddress.toLowerCase();
    //console.log(isValid);

  if (!isValid) throw new UnauthorizedException('Invalid signature');

  await this.userRepository.save(user);

  const token = this.jwtService.sign({ walletAddress, sub: user.id });
  return { access_token: token };
}

//   async generateNonce(walletAddress: string) {
//   const nonce = `Login to Tpay at ${new Date().toISOString()}`;

//   let user = await this.userService.findByWallet(walletAddress);
//   if (!user) {
//     user = await this.userService.create({walletAddress});
//   }

//   user.nonce = nonce;
//   await this.userRepository.save(user);
//   return { nonce };
// }
}
