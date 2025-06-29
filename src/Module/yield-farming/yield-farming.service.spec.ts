import { Test, TestingModule } from '@nestjs/testing';
import { YieldFarmingService } from './yield-farming.service';

describe('YieldFarmingService', () => {
  let service: YieldFarmingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YieldFarmingService],
    }).compile();

    service = module.get<YieldFarmingService>(YieldFarmingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
