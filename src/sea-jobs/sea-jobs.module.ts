import { Module } from '@nestjs/common';
import { SeaJobsController } from './sea-jobs.controller';
import { SeaJobsService } from './sea-jobs.service';
import { SeaJob } from './entities/sea-jobs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeaPersonnel } from 'src/sea-personnel/entities/sea-personnel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeaPersonnel,SeaJob])],
  controllers: [SeaJobsController],
  providers: [SeaJobsService],
  exports: [SeaJobsService],
})
export class SeaJobsModule { }
