import { PartialType } from '@nestjs/swagger';
import { CreateMaritimeEquipmentProductDto } from './create-maritime-equipment-product.dto';

export class UpdateMaritimeEquipmentProductDto extends PartialType(CreateMaritimeEquipmentProductDto) {}
