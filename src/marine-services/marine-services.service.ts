import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarineService } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceBooking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MarineServicesService {
  constructor(
    @InjectRepository(MarineService)
    private servicesRepo: Repository<MarineService>,
    @InjectRepository(ServiceBooking)
    private bookingsRepo: Repository<ServiceBooking>,
  ) {}

  // Services
  async createService(dto: CreateServiceDto, provider: User) {
    const service = this.servicesRepo.create({ ...dto, provider });
    return this.servicesRepo.save(service);
  }

  findAllServices() {
    return this.servicesRepo.find();
  }

  async findService(id: number) {
    const s = await this.servicesRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Service not found');
    return s;
  }

  async updateService(id: number, dto: UpdateServiceDto, user: User) {
    const service = await this.findService(id);
    if (service.provider.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Not allowed to update this service');
    }
    await this.servicesRepo.update(id, dto);
    return this.findService(id);
  }

  async removeService(id: number, user: User) {
    const service = await this.findService(id);
    if (service.provider.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Not allowed to remove this service');
    }
    await this.servicesRepo.delete(id);
    return { deleted: true };
  }

  // Bookings
  async createBooking(serviceId: number, dto: CreateBookingDto, client: User) {
    const service = await this.findService(serviceId);
    const booking = this.bookingsRepo.create({
      service,
      client,
      scheduleDate: dto.scheduleDate ? new Date(dto.scheduleDate) : undefined,
      notes: dto.notes,
      status: 'pending',
    });
    return this.bookingsRepo.save(booking);
  }

  async findBookingsForClient(clientId: number) {
    return this.bookingsRepo.find({ where: { client: { id: clientId } } });
  }

  async findBookingsForProvider(providerId: number) {
    return this.bookingsRepo.find({
      where: { service: { provider: { id: providerId } } as any },
    });
  }

  async updateBookingStatus(bookingId: number, status: ServiceBooking['status'], user: User) {
    const booking = await this.bookingsRepo.findOne({ where: { id: bookingId }, relations: ['service', 'service.provider'] });
    if (!booking) throw new NotFoundException('Booking not found');

    // only provider or admin can change status
    if (booking.service.provider.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Not allowed to change booking status');
    }

    booking.status = status;
    await this.bookingsRepo.save(booking);
    return booking;
  }
}
