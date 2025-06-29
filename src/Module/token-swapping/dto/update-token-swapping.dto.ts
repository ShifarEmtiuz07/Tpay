import { PartialType } from '@nestjs/mapped-types';
import { SwapTokensDto } from './create-token-swapping.dto';


export class UpdateTokenSwappingDto extends PartialType(SwapTokensDto) {}
