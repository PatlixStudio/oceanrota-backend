import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaritimeServicesController } from './maritime-services.controller';
import { MaritimeServicesService } from './maritime-services.service';
import { MaritimeService } from './entities/service.entity';
import { ServiceBooking } from './entities/booking.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaritimeService, ServiceBooking, User])],
  controllers: [MaritimeServicesController],
  providers: [MaritimeServicesService],
  exports: [MaritimeServicesService],
})
export class MaritimeServicesModule {}
