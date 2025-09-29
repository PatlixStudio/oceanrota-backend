import { Test, TestingModule } from '@nestjs/testing';
import { MarineServicesService } from './marine-services.service';

describe('MarineServicesService', () => {
  let service: MarineServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarineServicesService],
    }).compile();

    service = module.get<MarineServicesService>(MarineServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
