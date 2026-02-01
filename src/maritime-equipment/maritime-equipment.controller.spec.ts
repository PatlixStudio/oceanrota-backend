import { Test, TestingModule } from '@nestjs/testing';
import { MaritimeEquipmentController } from './maritime-equipment.controller';
import { MarineEquipmentService } from './maritime-equipment.service';

describe('MarineShopController', () => {
  let controller: MaritimeEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaritimeEquipmentController],
      providers: [MarineEquipmentService],
    }).compile();

    controller = module.get<MaritimeEquipmentController>(MaritimeEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
