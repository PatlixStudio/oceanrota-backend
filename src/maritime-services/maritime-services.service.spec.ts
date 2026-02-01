import { Test, TestingModule } from '@nestjs/testing';
import { MaritimeServicesService } from './maritime-services.service';

describe('MarineServicesService', () => {
  let service: MaritimeServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaritimeServicesService],
    }).compile();

    service = module.get<MaritimeServicesService>(MaritimeServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
