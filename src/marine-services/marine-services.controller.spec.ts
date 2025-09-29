import { Test, TestingModule } from '@nestjs/testing';
import { MarineServicesController } from './marine-services.controller';

describe('MarineServicesController', () => {
  let controller: MarineServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarineServicesController],
    }).compile();

    controller = module.get<MarineServicesController>(MarineServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
