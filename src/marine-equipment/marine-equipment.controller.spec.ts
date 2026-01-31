import { Test, TestingModule } from '@nestjs/testing';
import { MarineEquipmentController } from './marine-equipment.controller';
import { MarineEquipmentService } from './marine-equipment.service';

describe('MarineShopController', () => {
  let controller: MarineEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarineEquipmentController],
      providers: [MarineEquipmentService],
    }).compile();

    controller = module.get<MarineEquipmentController>(MarineEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
