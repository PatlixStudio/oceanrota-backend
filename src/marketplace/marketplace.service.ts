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
  ) { }

  async create(dto: CreateListingDto, userId: number) {
    const listing = this.listingsRepo.create({ ...dto, owner: { id: userId } });
    return this.listingsRepo.save(listing);
  }

  findAll() {
    return this.listingsRepo.find({
      where: { isActive: true }, // only active listings
      relations: ['owner'],      // include owner info
      order: { createdAt: 'DESC' } // optional: newest first
    });
  }

  async findAllPaginated(page = 1, limit = 10, sort = 'newest', filters: any) {
    const query = this.listingsRepo.createQueryBuilder('boat')
      .where('boat.isActive = :active', { active: true });

    // --- FILTERS ---
    if (filters.listingType && filters.listingType !== 'All') {
      query.andWhere('boat.listingType = :listingType', { listingType: filters.listingType });
    }

    if (filters.condition && filters.condition !== 'All') {
      query.andWhere('boat.condition = :condition', { condition: filters.condition });
    }

    if (filters.maker) {
      query.andWhere('boat.maker ILIKE :maker', { maker: `%${filters.maker}%` });
    }

    if (filters.country) {
      query.andWhere('boat.country ILIKE :country', { country: `%${filters.country}%` });
    }

    if (filters.minPrice) {
      query.andWhere('boat.price >= :minPrice', { minPrice: +filters.minPrice });
    }

    if (filters.maxPrice) {
      query.andWhere('boat.price <= :maxPrice', { maxPrice: +filters.maxPrice });
    }

    if (filters.minLength) {
      query.andWhere('boat.length >= :minLength', { minLength: +filters.minLength });
    }

    if (filters.maxLength) {
      query.andWhere('boat.length <= :maxLength', { maxLength: +filters.maxLength });
    }

    if (filters.year) {
      query.andWhere('boat.year = :year', { year: +filters.year });
    }

    if (filters.fuel) {
      query.andWhere('boat.fuelType ILIKE :fuel', { fuel: `%${filters.fuel}%` });
    }

    if (filters.hullMaterial) {
      query.andWhere('boat.hullMaterial ILIKE :hullMaterial', {
        hullMaterial: `%${filters.hullMaterial}%`,
      });
    }

    // --- SORTING ---
    switch (sort) {
      case 'oldest': query.orderBy('boat.createdAt', 'ASC'); break;
      case 'priceHigh': query.orderBy('boat.price', 'DESC'); break;
      case 'priceLow': query.orderBy('boat.price', 'ASC'); break;
      case 'yearNew': query.orderBy('boat.year', 'DESC'); break;
      case 'yearOld': query.orderBy('boat.year', 'ASC'); break;
      case 'lengthLong': query.orderBy('boat.length_m', 'DESC'); break;
      case 'lengthShort': query.orderBy('boat.length_m', 'ASC'); break;
      default: query.orderBy('boat.createdAt', 'DESC');
    }

    // --- PAGINATION ---
    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
