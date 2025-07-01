import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { interval } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
 async create(createUserDto: CreateUserDto): Promise<User>  {

  try{

    const user =await this.userRepository.create(createUserDto);
    const savedUser=await this.userRepository.save(user);
    return savedUser

  }catch(error){
      throw new InternalServerErrorException(error.message);
  }


  }

 async findAll() {

    try{
      const users= await this.userRepository.find();
      return users;

    }catch(error){
      throw new InternalServerErrorException(error.message)
    }
   
  }

 async findByWallet(walletAddress: string):Promise<User | null> {

  try{
   const user= await this.userRepository.findOne({ where: { walletAddress:walletAddress } });
    return user;
  }catch(error){
    throw new InternalServerErrorException(error.message)
  }

 
  }


}
