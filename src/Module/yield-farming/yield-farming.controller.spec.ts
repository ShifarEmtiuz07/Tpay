import { Test, TestingModule } from '@nestjs/testing';
import { YieldFarmingController } from './yield-farming.controller';
import { YieldFarmingService } from './yield-farming.service';

describe('YieldFarmingController', () => {
  let controller: YieldFarmingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YieldFarmingController],
      providers: [YieldFarmingService],
    }).compile();

    controller = module.get<YieldFarmingController>(YieldFarmingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
