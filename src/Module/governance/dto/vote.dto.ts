import { IsNumber, IsString } from "class-validator";

export class VoteDto {
  @IsString()
  voterAddress: string;
  @IsString()
  vote: 'yes' | 'no';
  @IsNumber()
  weight: number;
}