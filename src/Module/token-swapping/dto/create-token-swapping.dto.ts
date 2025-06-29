import { IsNumber, IsString } from "class-validator";

export class SwapTokensDto {
  @IsNumber()
  poolId: number;

  @IsString()
  fromToken: string;

  @IsNumber()
  amount: number;
}
