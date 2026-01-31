import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from './entities/jobs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crew } from 'src/crew/entities/crew.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crew,Job])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule { }
