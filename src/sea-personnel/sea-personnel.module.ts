import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeaPersonnelService } from './sea-personnel.service';
import { SeaPersonnelController } from './sea-personnel.controller';
import { SeaPersonnel } from './entities/sea-personnel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeaPersonnel])],
  controllers: [SeaPersonnelController],
  providers: [SeaPersonnelService],
  exports: [SeaPersonnelService],
})
export class SeaPersonnelModule {}
