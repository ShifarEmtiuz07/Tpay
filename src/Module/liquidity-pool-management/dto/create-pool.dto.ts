import { IsString, IsNumber } from 'class-validator';

export class CreatePoolDto {
  @IsString()
  tokenA: string;

  @IsString()
  tokenB: string;

  @IsNumber()
  reserveA: number;

  @IsNumber()
  reserveB: number;
}
