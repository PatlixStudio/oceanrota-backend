import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CrewService } from './crew.service';
import { CreateCrewDto } from './dto/create-crew.dto';
import { UpdateCrewDto } from './dto/update-crew.dto';
import { Crew } from './entities/crew.entity';

@ApiTags('Crew & Seafarer Management')
@Controller('crew')
export class CrewController {
  constructor(private readonly seaPersonnelService: CrewService) { }

  @Post()
  @ApiOperation({ summary: 'Register a new Crew profile' })
  create(@Body() dto: CreateCrewDto) {
    return this.seaPersonnelService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated Crew' })
  @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated list of personnel' })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ data: Crew[]; total: number; page: number; limit: number }> {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    return this.seaPersonnelService.findAllPaginated(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Crew profile by ID' })
  findOne(@Param('id') id: string) {
    return this.seaPersonnelService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Crew profile' })
  update(@Param('id') id: string, @Body() dto: UpdateCrewDto) {
    return this.seaPersonnelService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Crew profile' })
  remove(@Param('id') id: string) {
    return this.seaPersonnelService.remove(+id);
  }
}
