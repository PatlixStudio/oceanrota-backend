import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { Job } from './entities/jobs.entity';
import { Crew } from '../crew/entities/crew.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('Maritime Jobs')
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Get()
    @ApiOperation({ summary: 'Get paginated maritime jobs' })
    @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
    @ApiResponse({ status: 200, description: 'Paginated list of jobs' })
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<{ data: Job[]; total: number; page: number; limit: number }> {
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        return this.jobsService.findAllPaginated(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a sea job by ID' })
    @ApiResponse({ status: 200, description: 'Job details', type: Job })
    findOne(@Param('id') id: number): Promise<Job | null> {
        return this.jobsService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new maritime job' })
    @ApiResponse({ status: 201, description: 'Created job', type: Job })
    create(@Body() dto: CreateJobDto): Promise<Job> {
        return this.jobsService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a maritime job' })
    @ApiResponse({ status: 200, description: 'Updated job', type: Job })
    update(@Param('id') id: number, @Body() dto: UpdateJobDto): Promise<Job | null> {
        return this.jobsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a maritime job' })
    @ApiResponse({ status: 200, description: 'Deleted job' })
    remove(@Param('id') id: number) {
        return this.jobsService.remove(id);
    }

    @Get(':id/candidates')
    @ApiOperation({ summary: 'Search maritime professional for a job' })
    @ApiQuery({ name: 'position', required: false, description: 'Filter by position' })
    @ApiQuery({ name: 'experienceYears', required: false, description: 'Filter by minimum experience' })
    @ApiResponse({ status: 200, description: 'List of suitable personnel', type: [Crew] })
    searchCandidates(
        @Param('id') id: number,
        @Query('position') position?: string,
        @Query('experienceYears') experienceYears?: number,
    ): Promise<Crew[]> {
        return this.jobsService.searchCandidates(id, { position, experienceYears });
    }
}
