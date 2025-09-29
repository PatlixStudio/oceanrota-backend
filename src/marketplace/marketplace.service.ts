import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepo: Repository<Listing>,
  ) {}

  async create(dto: CreateListingDto, userId: number) {
    const listing = this.listingsRepo.create({ ...dto, owner: { id: userId } });
    return this.listingsRepo.save(listing);
  }

  findAll() {
    return this.listingsRepo.find({ relations: ['owner'] });
  }

  async findOne(id: number) {
    const listing = await this.listingsRepo.findOne({ where: { id }, relations: ['owner'] });
    if (!listing) throw new NotFoundException(`Listing ${id} not found`);
    return listing;
  }

  async update(id: number, dto: UpdateListingDto) {
    await this.findOne(id);
    await this.listingsRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.listingsRepo.delete(id);
  }
}
