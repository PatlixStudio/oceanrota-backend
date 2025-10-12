import { Test, TestingModule } from '@nestjs/testing';
import { SeaJobsController } from './sea-jobs.controller';

describe('SeaJobsController', () => {
  let controller: SeaJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeaJobsController],
    }).compile();

    controller = module.get<SeaJobsController>(SeaJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
