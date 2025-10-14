import { Test, TestingModule } from '@nestjs/testing';
import { TokenizationController } from './tokenization.controller';

describe('TokenizationController', () => {
  let controller: TokenizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenizationController],
    }).compile();

    controller = module.get<TokenizationController>(TokenizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
