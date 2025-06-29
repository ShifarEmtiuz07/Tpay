import { Test, TestingModule } from '@nestjs/testing';
import { LiquidityPoolManagementController } from './liquidity-pool-management.controller';
import { LiquidityPoolManagementService } from './liquidity-pool-management.service';

describe('LiquidityPoolManagementController', () => {
  let controller: LiquidityPoolManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiquidityPoolManagementController],
      providers: [LiquidityPoolManagementService],
    }).compile();

    controller = module.get<LiquidityPoolManagementController>(LiquidityPoolManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
