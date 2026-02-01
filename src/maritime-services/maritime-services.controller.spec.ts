import { Test, TestingModule } from '@nestjs/testing';
import { MaritimeServicesController } from './maritime-services.controller';

describe('MarineServicesController', () => {
  let controller: MaritimeServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaritimeServicesController],
    }).compile();

    controller = module.get<MaritimeServicesController>(MaritimeServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
