import { PartialType } from '@nestjs/mapped-types';
import { CreateYieldFarmingDto } from './create-yield-farming.dto';

export class UpdateYieldFarmingDto extends PartialType(CreateYieldFarmingDto) {}
