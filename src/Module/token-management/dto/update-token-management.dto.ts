import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token-management.dto';


export class UpdateTokenDto extends PartialType(CreateTokenDto) {}
