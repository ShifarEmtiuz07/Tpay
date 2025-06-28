import { Test, TestingModule } from '@nestjs/testing';
import { TokenManagementController } from './token-management.controller';
import { TokenManagementService } from './token-management.service';

describe('TokenManagementController', () => {
  let controller: TokenManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenManagementController],
      providers: [TokenManagementService],
    }).compile();

    controller = module.get<TokenManagementController>(TokenManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
