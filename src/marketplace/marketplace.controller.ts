import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@ApiTags('Marketplace')
@Controller('marketplace/listings')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create new listing' })
  create(@Body() dto: CreateListingDto) {
    // TODO: attach current userId from auth guard
    return this.marketplaceService.create(dto, 1);
  }

  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  findAll() {
    return this.marketplaceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get listing by ID' })
  findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update listing by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateListingDto) {
    return this.marketplaceService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete listing by ID' })
  remove(@Param('id') id: string) {
    return this.marketplaceService.remove(+id);
  }
}
