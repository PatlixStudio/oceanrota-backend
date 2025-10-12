import { PartialType } from '@nestjs/swagger';
import { CreateSeaJobDto } from './create-sea-job.dto';

export class UpdateSeaJobDto extends PartialType(CreateSeaJobDto) {}
