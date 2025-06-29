import { IsString } from "class-validator";

export class CreateProposalDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  creatorAddress: string;
  @IsString()
  deadline: string;
}