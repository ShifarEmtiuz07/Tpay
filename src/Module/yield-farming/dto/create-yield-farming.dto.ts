import { IsNumber, IsString } from "class-validator";

export class CreateYieldFarmingDto {
    
  @IsString ({message: 'Farm name must be a string'})
  name: string;
  @IsString({message: 'lpTokenAddress must be a string'})
  lpTokenAddress: string;
  @IsNumber()
  rewardRate: number;
}
