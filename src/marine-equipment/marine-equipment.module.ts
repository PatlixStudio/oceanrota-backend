import { Module } from '@nestjs/common';
import { MarineEquipmentService } from './marine-equipment.service';
import { MarineEquipmentController } from './marine-equipment.controller';

@Module({
  controllers: [MarineEquipmentController],
  providers: [MarineEquipmentService],
})
export class MarineEquipmentModule {}
