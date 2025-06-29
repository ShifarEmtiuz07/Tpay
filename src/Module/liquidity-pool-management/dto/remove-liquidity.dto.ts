import { IsUUID, IsNumber, IsString } from 'class-validator';

export class RemoveLiquidityDto {
  @IsNumber()
  poolId: number;

  @IsNumber()
  share: number;
}
