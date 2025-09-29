import { Test, TestingModule } from '@nestjs/testing';
import { LearningCenterService } from './learning-center.service';

describe('LearningCenterService', () => {
  let service: LearningCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningCenterService],
    }).compile();

    service = module.get<LearningCenterService>(LearningCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
