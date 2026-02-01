import { Module } from '@nestjs/common';
import { MarineEquipmentService } from './maritime-equipment.service';
import { MaritimeEquipmentController } from './maritime-equipment.controller';

@Module({
  controllers: [MaritimeEquipmentController],
  providers: [MarineEquipmentService],
})
export class MaritimeEquipmentModule {}
