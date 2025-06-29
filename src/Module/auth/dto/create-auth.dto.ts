import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAuthDto {
      @IsNotEmpty()
  @IsString()
  walletAddress: string;

  // @IsNotEmpty()
  // @IsString()
  // signature: string;

  // @IsNotEmpty()
  // @IsString()
  // nonce: string;
}
