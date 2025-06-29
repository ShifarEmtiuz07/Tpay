import { Test, TestingModule } from '@nestjs/testing';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';

describe('LiquidityPoolManagementService', () => {
  let service: LiquidityPoolManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiquidityPoolManagementService],
    }).compile();

    service = module.get<LiquidityPoolManagementService>(LiquidityPoolManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
