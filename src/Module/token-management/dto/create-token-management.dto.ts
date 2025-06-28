import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateTokenDto {
     @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  decimals: number;

  @IsNumber()
  totalSupply: number;
}
