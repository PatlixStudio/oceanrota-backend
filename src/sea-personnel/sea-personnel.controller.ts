import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SeaPersonnelService } from './sea-personnel.service';
import { CreateSeaPersonnelDto } from './dto/create-sea-personnel.dto';
import { UpdateSeaPersonnelDto } from './dto/update-sea-personnel.dto';

@ApiTags('Sea Personnel')
@Controller('sea-personnel')
export class SeaPersonnelController {
  constructor(private readonly seaPersonnelService: SeaPersonnelService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new sea personnel profile' })
  create(@Body() dto: CreateSeaPersonnelDto) {
    return this.seaPersonnelService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all sea personnel profiles' })
  findAll() {
    return this.seaPersonnelService.findAll();
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
