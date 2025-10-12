import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeaPersonnel } from './entities/sea-personnel.entity';
import { CreateSeaPersonnelDto } from './dto/create-sea-personnel.dto';
import { UpdateSeaPersonnelDto } from './dto/update-sea-personnel.dto';

@Injectable()
export class SeaPersonnelService {
  constructor(
    @InjectRepository(SeaPersonnel)
    private repo: Repository<SeaPersonnel>,
  ) { }

  create(dto: CreateSeaPersonnelDto) {
    const personnel = this.repo.create(dto);
    return this.repo.save(personnel);
  }

  async findAllPaginated(
    page = 1,
    limit = 10,
  ): Promise<{ data: SeaPersonnel[]; total: number; page: number; limit: number }> {
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

  async update(id: number, dto: UpdateSeaPersonnelDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
