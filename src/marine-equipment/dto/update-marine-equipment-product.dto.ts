import { PartialType } from '@nestjs/swagger';
import { CreateMarineEquipmentProductDto } from './create-marine-equipment-product.dto';

export class UpdateMarineEquipmentProductDto extends PartialType(CreateMarineEquipmentProductDto) {}
