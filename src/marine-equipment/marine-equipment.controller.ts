import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarineEquipmentService } from './marine-equipment.service';
import { CreateMarineEquipmentProductDto } from './dto/create-marine-equipment-product.dto';
import { UpdateMarineEquipmentProductDto } from './dto/update-marine-equipment-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarineEquipmentProduct } from './entities/marine-equipment-product.entity';

@ApiTags('Marine Shop')
@Controller('marine-equipment')
export class MarineEquipmentController {
  constructor(private readonly marineShopService: MarineEquipmentService) {}

 
  @Post('product')
  @ApiOperation({ summary: 'Create a New Marine Equipment Product' })
  @ApiResponse({ status: 201, type: MarineEquipmentProduct })
  create(@Body() createMarineShopDto: CreateMarineEquipmentProductDto) {
    return this.marineShopService.create(createMarineShopDto);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get All Marine Equipment Products' })
  @ApiResponse({ status: 201, type: MarineEquipmentProduct })
  findAll() {
    return this.marineShopService.findAll();
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get Marine Equipment Product by ID' })
  @ApiResponse({ status: 201, type: MarineEquipmentProduct })
  findOne(@Param('id') id: string) {
    return this.marineShopService.findOne(+id);
  }

  @Patch('product/:id')
  @ApiOperation({ summary: 'Update Marine Equipment Product by ID' })
  @ApiResponse({ status: 201, type: MarineEquipmentProduct })
  update(@Param('id') id: string, @Body() updateMarineShopDto: UpdateMarineEquipmentProductDto) {
    return this.marineShopService.update(+id, updateMarineShopDto);
  }

  @Delete('product/:id')
  @ApiOperation({ summary: 'Delete Marine Equipment Product by ID' })
  remove(@Param('id') id: string) {
    return this.marineShopService.remove(+id);
  }
}
