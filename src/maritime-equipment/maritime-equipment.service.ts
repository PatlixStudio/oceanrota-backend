import { Injectable } from '@nestjs/common';
import { CreateMaritimeEquipmentProductDto } from './dto/create-maritime-equipment-product.dto';
import { UpdateMaritimeEquipmentProductDto } from './dto/update-maritime-equipment-product.dto';

@Injectable()
export class MarineEquipmentService {
  create(createMarineShopDto: CreateMaritimeEquipmentProductDto) {
    return 'This action adds a new marine equipment product';
  }

  findAll() {
    return `This action returns all marine equipment product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marine equipment product`;
  }

  update(id: number, updateMarineShopDto: UpdateMaritimeEquipmentProductDto) {
    return `This action updates a #${id} marine equipment product`;
  }

  remove(id: number) {
    return `This action removes a #${id} marine equipment product`;
  }
}
