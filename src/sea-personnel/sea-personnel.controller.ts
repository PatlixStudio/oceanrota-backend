import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SeaPersonnelService } from './sea-personnel.service';
import { CreateSeaPersonnelDto } from './dto/create-sea-personnel.dto';
import { UpdateSeaPersonnelDto } from './dto/update-sea-personnel.dto';
import { SeaPersonnel } from './entities/sea-personnel.entity';

@ApiTags('Sea Personnel')
@Controller('sea-personnel')
export class SeaPersonnelController {
  constructor(private readonly seaPersonnelService: SeaPersonnelService) { }

  @Post()
  @ApiOperation({ summary: 'Register a new sea personnel profile' })
  create(@Body() dto: CreateSeaPersonnelDto) {
    return this.seaPersonnelService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated sea personnel' })
  @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated list of personnel' })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ data: SeaPersonnel[]; total: number; page: number; limit: number }> {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    return this.seaPersonnelService.findAllPaginated(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sea personnel profile by ID' })
  findOne(@Param('id') id: string) {
    return this.seaPersonnelService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a sea personnel profile' })
  update(@Param('id') id: string, @Body() dto: UpdateSeaPersonnelDto) {
    return this.seaPersonnelService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sea personnel profile' })
  remove(@Param('id') id: string) {
    return this.seaPersonnelService.remove(+id);
  }
}
