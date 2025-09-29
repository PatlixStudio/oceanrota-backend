import { PartialType } from '@nestjs/swagger';
import { CreateSeaPersonnelDto } from './create-sea-personnel.dto';

export class UpdateSeaPersonnelDto extends PartialType(CreateSeaPersonnelDto) {}
