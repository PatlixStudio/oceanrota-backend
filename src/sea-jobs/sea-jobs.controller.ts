import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SeaJobsService } from './sea-jobs.service';
import { SeaJob } from './entities/sea-jobs.entity';
import { SeaPersonnel } from '../sea-personnel/entities/sea-personnel.entity';
import { CreateSeaJobDto } from './dto/create-sea-job.dto';
import { UpdateSeaJobDto } from './dto/update-sea-job.dto';

@ApiTags('Sea Jobs')
@Controller('sea-jobs')
export class SeaJobsController {
    constructor(private readonly seaJobsService: SeaJobsService) { }

    @Get()
    @ApiOperation({ summary: 'Get paginated sea jobs' })
    @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
    @ApiResponse({ status: 200, description: 'Paginated list of jobs' })
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<{ data: SeaJob[]; total: number; page: number; limit: number }> {
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        return this.seaJobsService.findAllPaginated(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a sea job by ID' })
    @ApiResponse({ status: 200, description: 'Sea job details', type: SeaJob })
    findOne(@Param('id') id: number): Promise<SeaJob | null> {
        return this.seaJobsService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new sea job' })
    @ApiResponse({ status: 201, description: 'Created job', type: SeaJob })
    create(@Body() dto: CreateSeaJobDto): Promise<SeaJob> {
        return this.seaJobsService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a sea job' })
    @ApiResponse({ status: 200, description: 'Updated job', type: SeaJob })
    update(@Param('id') id: number, @Body() dto: UpdateSeaJobDto): Promise<SeaJob | null> {
        return this.seaJobsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a sea job' })
    @ApiResponse({ status: 200, description: 'Deleted job' })
    remove(@Param('id') id: number) {
        return this.seaJobsService.remove(id);
    }

    @Get(':id/candidates')
    @ApiOperation({ summary: 'Search sea personnel for a job' })
    @ApiQuery({ name: 'position', required: false, description: 'Filter by position' })
    @ApiQuery({ name: 'experienceYears', required: false, description: 'Filter by minimum experience' })
    @ApiResponse({ status: 200, description: 'List of suitable personnel', type: [SeaPersonnel] })
    searchCandidates(
        @Param('id') id: number,
        @Query('position') position?: string,
        @Query('experienceYears') experienceYears?: number,
    ): Promise<SeaPersonnel[]> {
        return this.seaJobsService.searchCandidates(id, { position, experienceYears });
    }
}
