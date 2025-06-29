import { IsNumber, IsString } from 'class-validator';

export class AddLiquidityDto {
  @IsNumber()
  poolId: number;

  @IsNumber()
  amountA: number;

  @IsNumber()
  amountB: number;
}
