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
  ) {}

  create(dto: CreateSeaPersonnelDto) {
    const personnel = this.repo.create(dto);
    return this.repo.save(personnel);
  }

  findAll() {
    return this.repo.find();
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
