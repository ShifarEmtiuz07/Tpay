import {  Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token-management.entity';
import { CreateTokenDto } from './dto/create-token-management.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokenManagementService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
     @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto,reqUser) {

    try{
      
    const user = await this.userRepository.findOne({ where: { walletAddress: reqUser.walletAddress } });
       
    if (!user) {
      throw new NotFoundException('User does not exists');
    }


    const token = this.tokenRepository.create({...dto,user});
    
    const savedToken = await this.tokenRepository.save(token);
    return savedToken;
    
    

    }catch (error) {
      throw new InternalServerErrorException('Error creating token: ' + error.message);
    }
   
  }

  async findAll(): Promise<Token[]> {
   try{
   return this.tokenRepository.find({relations: ['user']});
   }catch (error) {
      throw new InternalServerErrorException('Error fetching tokens: ' + error.message);
    }
  }

  async findById(id: string): Promise<Token> {
    try{
      const token = await this.tokenRepository.findOne({ where: { id },relations: ['user'] });
    if (!token) throw new NotFoundException('Token not found');
    return token;
    }catch (error) {
      throw new InternalServerErrorException('Error fetching token: ' + error.message);
    } 
  }

  async findByAddress(walletAddress: string): Promise<Token> {
    try{

      const token = await this.tokenRepository.findOne({ where: { walletAddress },relations: ['user'] });
    if (!token) throw new NotFoundException('Token not found');
    return token;

    }catch (error) {
      throw new InternalServerErrorException('Error fetching token by address: ' + error.message);
    }
  }
}
