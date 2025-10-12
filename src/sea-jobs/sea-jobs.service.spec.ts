import { Test, TestingModule } from '@nestjs/testing';
import { SeaJobsService } from './sea-jobs.service';

describe('SeaJobsService', () => {
  let service: SeaJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaJobsService],
    }).compile();

    service = module.get<SeaJobsService>(SeaJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
