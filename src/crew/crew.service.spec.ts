import { Test, TestingModule } from '@nestjs/testing';
import { SeaPersonnelService } from './crew.service';

describe('SeaPersonnelService', () => {
  let service: SeaPersonnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaPersonnelService],
    }).compile();

    service = module.get<SeaPersonnelService>(SeaPersonnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
