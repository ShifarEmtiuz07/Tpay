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

  findAll() {
    return `This action returns all users`;
  }

 async findByWallet(walletAddress: string):Promise<User | null> {

  try{
   const user= await this.userRepository.findOne({ where: { walletAddress:walletAddress } });
    return user;
  }catch(error){
    throw new InternalServerErrorException(error.message)
  }

 
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
