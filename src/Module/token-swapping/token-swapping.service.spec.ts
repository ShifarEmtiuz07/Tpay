import { Test, TestingModule } from '@nestjs/testing';
import { TokenSwappingService } from './token-swapping.service';

describe('TokenSwappingService', () => {
  let service: TokenSwappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenSwappingService],
    }).compile();

    service = module.get<TokenSwappingService>(TokenSwappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
