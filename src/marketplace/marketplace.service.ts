import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const listing = this.listingsRepo.create({
      ...dto,
      owner: { id: userId },
      vessel: {
        ...dto.vessel,
        owner: { id: userId },
      },
    });
    return this.listingsRepo.save(listing);
  }

  /** 👇 THIS IS WHAT YOU WERE MISSING */
  async attachImages(listingId: string, urls: string[]) {
    const listing = await this.listingsRepo.findOne({
      where: { id: Number(listingId) },
      relations: ['vessel'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (!listing.vessel) {
      throw new BadRequestException('Listing has no vessel');
    }

    listing.vessel.images = [
      ...(listing.vessel.images ?? []),
      ...urls,
    ];

    await this.listingsRepo.save(listing);
  }

  findAll() {
    return this.listingsRepo.find({
      where: { isActive: true }, // only active listings
      relations: ['owner', 'vessel'],      // include owner info
      order: { createdAt: 'DESC' } // optional: newest first
    });
  }

  async findAllPaginated(page = 1, limit = 10, sort = 'newest', filters: any) {
    const query = this.listingsRepo
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .leftJoinAndSelect('listing.vessel', 'vessel')
      .where('listing.isActive = :active', { active: true });

    // --- FILTERS ---

    // Listing-level filters
    if (filters.listingType && filters.listingType !== 'All') {
      query.andWhere('listing.listingType = :listingType', { listingType: filters.listingType });
    }

    if (filters.condition && filters.condition !== 'All') {
      query.andWhere('vessel.condition = :condition', { condition: filters.condition });
    }

    if (filters.make) {
      query.andWhere('vessel.make ILIKE :make', { make: `%${filters.make}%` });
    }

    if (filters.country) {
      query.andWhere('vessel.country ILIKE :country', { country: `%${filters.country}%` });
    }

    if (filters.city) {
      query.andWhere('vessel.city ILIKE :city', { city: `%${filters.city}%` });
    }

    if (filters.port) {
      query.andWhere('vessel.port ILIKE :port', { port: `%${filters.port}%` });
    }

    if (filters.minPrice) {
      query.andWhere('listing.price >= :minPrice', { minPrice: +filters.minPrice });
    }

    if (filters.maxPrice) {
      query.andWhere('listing.price <= :maxPrice', { maxPrice: +filters.maxPrice });
    }

    if (filters.minLength) {
      query.andWhere('vessel.length_m >= :minLength', { minLength: +filters.minLength });
    }

    if (filters.maxLength) {
      query.andWhere('vessel.length_m <= :maxLength', { maxLength: +filters.maxLength });
    }

    if (filters.year) {
      query.andWhere('vessel.year = :year', { year: +filters.year });
    }

    if (filters.fuelType) {
      query.andWhere('vessel.features ->> \'fuelType\' ILIKE :fuelType', { fuelType: `%${filters.fuelType}%` });
    }

    if (filters.hullMaterial) {
      query.andWhere('vessel.hullMaterial ILIKE :hullMaterial', {
        hullMaterial: `%${filters.hullMaterial}%`,
      });
    }

    // --- SORTING ---
    switch (sort) {
      case 'oldest':
        query.orderBy('listing.createdAt', 'ASC');
        break;
      case 'priceHigh':
        query.orderBy('listing.price', 'DESC');
        break;
      case 'priceLow':
        query.orderBy('listing.price', 'ASC');
        break;
      case 'yearNew':
        query.orderBy('vessel.year', 'DESC');
        break;
      case 'yearOld':
        query.orderBy('vessel.year', 'ASC');
        break;
      case 'lengthLong':
        query.orderBy('vessel.length_m', 'DESC');
        break;
      case 'lengthShort':
        query.orderBy('vessel.length_m', 'ASC');
        break;
      default:
        query.orderBy('listing.createdAt', 'DESC');
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
