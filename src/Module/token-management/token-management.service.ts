import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token-management.entity';
import { CreateTokenDto } from './dto/create-token-management.dto';

@Injectable()
export class TokenManagementService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(dto) {

    try{
      
       const exists = await this.tokenRepository.findOne({ where: { address: dto.address } });
       
    if (exists) {
      throw new ConflictException('Token with this address already exists');
    }


    const token = this.tokenRepository.create(dto);
    
    const savedToken = await this.tokenRepository.save(token);
    return savedToken;
    
    

    }catch (error) {
      throw new InternalServerErrorException('Error creating token: ' + error.message);
    }
   
  }

  async findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async findById(id: string): Promise<Token> {
    const token = await this.tokenRepository.findOne({ where: { id } });
    if (!token) throw new NotFoundException('Token not found');
    return token;
  }

  async findByAddress(address: string): Promise<Token> {
    const token = await this.tokenRepository.findOne({ where: { address } });
    if (!token) throw new NotFoundException('Token not found');
    return token;
  }
}
