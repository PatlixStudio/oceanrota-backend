import { Test, TestingModule } from '@nestjs/testing';
import { LearningCenterController } from './learning-center.controller';

describe('LearningCenterController', () => {
  let controller: LearningCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningCenterController],
    }).compile();

    controller = module.get<LearningCenterController>(LearningCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
