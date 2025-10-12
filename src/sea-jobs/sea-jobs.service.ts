import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeaJob } from './entities/sea-jobs.entity';
import { SeaPersonnel } from '../sea-personnel/entities/sea-personnel.entity';
import { CreateSeaJobDto } from './dto/create-sea-job.dto';
import { UpdateSeaJobDto } from './dto/update-sea-job.dto';

@Injectable()
export class SeaJobsService {
    constructor(
        @InjectRepository(SeaJob)
        private readonly jobRepo: Repository<SeaJob>,
        @InjectRepository(SeaPersonnel)
        private readonly personnelRepo: Repository<SeaPersonnel>,
    ) { }

    async create(dto: CreateSeaJobDto): Promise<SeaJob> {
        const job = this.jobRepo.create(dto);
        return this.jobRepo.save(job);
    }

    async findAllPaginated(page = 1, limit = 10): Promise<{ data: SeaJob[]; total: number; page: number; limit: number }> {
        const [data, total] = await this.jobRepo.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { data, total, page, limit };
    }

    async findOne(id: number): Promise<SeaJob> {
        const job = await this.jobRepo.findOneBy({ id });
        if (!job) throw new NotFoundException(`SeaJob with ID ${id} not found`);
        return job;
    }

    async update(id: number, dto: UpdateSeaJobDto): Promise<SeaJob> {
        const result = await this.jobRepo.update(id, dto);
        if (result.affected === 0) throw new NotFoundException(`SeaJob with ID ${id} not found`);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.jobRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException(`SeaJob with ID ${id} not found`);
    }

    async searchCandidates(jobId: number, filters?: { position?: string; experienceYears?: number }): Promise<SeaPersonnel[]> {
        const job = await this.jobRepo.findOneBy({ id: jobId });
        if (!job) throw new NotFoundException(`SeaJob with ID ${jobId} not found`);

        const query = this.personnelRepo.createQueryBuilder('p').where('p.isActive = :active', { active: true });

        if (filters?.position) query.andWhere('p.position = :position', { position: filters.position });
        if (filters?.experienceYears) query.andWhere('p.experienceYears >= :exp', { exp: filters.experienceYears });

        const candidates = await query.getMany();
        if (candidates.length === 0) throw new NotFoundException('No matching personnel found');
        return candidates;
    }
}
