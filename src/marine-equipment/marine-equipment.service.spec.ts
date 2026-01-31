import { Test, TestingModule } from '@nestjs/testing';
import { MarineEquipmentService } from './marine-equipment.service';

describe('MarineShopService', () => {
  let service: MarineEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarineEquipmentService],
    }).compile();

    service = module.get<MarineEquipmentService>(MarineEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
