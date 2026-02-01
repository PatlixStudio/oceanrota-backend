import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarineEquipmentService } from './maritime-equipment.service';
import { CreateMaritimeEquipmentProductDto } from './dto/create-maritime-equipment-product.dto';
import { UpdateMaritimeEquipmentProductDto } from './dto/update-maritime-equipment-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaritimeEquipmentProduct } from './entities/maritime-equipment-product.entity';

@ApiTags('Maritime Equipment & Supplies (Marine Shop)')
@Controller('marine-equipment')
export class MaritimeEquipmentController {
  constructor(private readonly marineShopService: MarineEquipmentService) {}

 
  @Post('product')
  @ApiOperation({ summary: 'Create a New Marine Equipment Product' })
  @ApiResponse({ status: 201, type: MaritimeEquipmentProduct })
  create(@Body() createMarineShopDto: CreateMaritimeEquipmentProductDto) {
    return this.marineShopService.create(createMarineShopDto);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get All Marine Equipment Products' })
  @ApiResponse({ status: 201, type: MaritimeEquipmentProduct })
  findAll() {
    return this.marineShopService.findAll();
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get Marine Equipment Product by ID' })
  @ApiResponse({ status: 201, type: MaritimeEquipmentProduct })
  findOne(@Param('id') id: string) {
    return this.marineShopService.findOne(+id);
  }

  @Patch('product/:id')
  @ApiOperation({ summary: 'Update Marine Equipment Product by ID' })
  @ApiResponse({ status: 201, type: MaritimeEquipmentProduct })
  update(@Param('id') id: string, @Body() updateMarineShopDto: UpdateMaritimeEquipmentProductDto) {
    return this.marineShopService.update(+id, updateMarineShopDto);
  }

  @Delete('product/:id')
  @ApiOperation({ summary: 'Delete Marine Equipment Product by ID' })
  remove(@Param('id') id: string) {
    return this.marineShopService.remove(+id);
  }
}
