import { Test, TestingModule } from '@nestjs/testing';
import { SeaPersonnelController } from './sea-personnel.controller';

describe('SeaPersonnelController', () => {
  let controller: SeaPersonnelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeaPersonnelController],
    }).compile();

    controller = module.get<SeaPersonnelController>(SeaPersonnelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
