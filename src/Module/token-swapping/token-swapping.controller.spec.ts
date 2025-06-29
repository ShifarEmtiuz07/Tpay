import { Test, TestingModule } from '@nestjs/testing';
import { TokenSwappingController } from './token-swapping.controller';
import { TokenSwappingService } from './token-swapping.service';

describe('TokenSwappingController', () => {
  let controller: TokenSwappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenSwappingController],
      providers: [TokenSwappingService],
    }).compile();

    controller = module.get<TokenSwappingController>(TokenSwappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
