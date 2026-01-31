import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crew } from './entities/crew.entity';
import { CreateCrewDto } from './dto/create-crew.dto';
import { UpdateCrewDto } from './dto/update-crew.dto';

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew)
    private repo: Repository<Crew>,
  ) { }

  create(dto: CreateCrewDto) {
    const personnel = this.repo.create(dto);
    return this.repo.save(personnel);
  }

  async findAllPaginated(
    page = 1,
    limit = 10,
  ): Promise<{ data: Crew[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCrewDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
