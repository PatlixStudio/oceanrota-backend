import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarineServicesController } from './marine-services.controller';
import { MarineServicesService } from './marine-services.service';
import { MarineService } from './entities/service.entity';
import { ServiceBooking } from './entities/booking.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarineService, ServiceBooking, User])],
  controllers: [MarineServicesController],
  providers: [MarineServicesService],
  exports: [MarineServicesService],
})
export class MarineServicesModule {}
