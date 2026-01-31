import { Injectable } from '@nestjs/common';
import { CreateMarineEquipmentProductDto } from './dto/create-marine-equipment-product.dto';
import { UpdateMarineEquipmentProductDto } from './dto/update-marine-equipment-product.dto';

@Injectable()
export class MarineEquipmentService {
  create(createMarineShopDto: CreateMarineEquipmentProductDto) {
    return 'This action adds a new marine equipment product';
  }

  findAll() {
    return `This action returns all marine equipment product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marine equipment product`;
  }

  update(id: number, updateMarineShopDto: UpdateMarineEquipmentProductDto) {
    return `This action updates a #${id} marine equipment product`;
  }

  remove(id: number) {
    return `This action removes a #${id} marine equipment product`;
  }
}
