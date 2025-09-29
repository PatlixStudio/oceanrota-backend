import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MarineServicesService } from './marine-services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MarineService } from './entities/service.entity';
import { ServiceBooking } from './entities/booking.entity';

// TODO: import and use JwtAuthGuard and a CurrentUser decorator
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Marine Services')
@Controller('marine-services')
export class MarineServicesController {
  constructor(private readonly svc: MarineServicesService) {}

  // -------- Services CRUD --------
  @Post('services')
  @ApiOperation({ summary: 'Create a marine service' })
  @ApiResponse({ status: 201, type: MarineService })
  // @UseGuards(JwtAuthGuard)
  async createService(
    // @CurrentUser() user: User,
    @Body() dto: CreateServiceDto,
  ) {
    // TODO: replace provider with current user
    // return this.svc.createService(dto, user);
    throw new Error('Hook current user and remove this throw'); // placeholder until auth wired
  }

  @Get('services')
  @ApiOperation({ summary: 'List all marine services' })
  @ApiResponse({ status: 200, type: [MarineService] })
  findAllServices() {
    return this.svc.findAllServices();
  }

  @Get('services/:id')
  @ApiOperation({ summary: 'Get service details' })
  findService(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findService(id);
  }

  @Put('services/:id')
  @ApiOperation({ summary: 'Update a service' })
  // @UseGuards(JwtAuthGuard)
  async updateService(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    // TODO: use current user
    throw new Error('Hook current user and remove this throw');
  }

  @Delete('services/:id')
  @ApiOperation({ summary: 'Delete a service' })
  // @UseGuards(JwtAuthGuard)
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    // TODO: use current user
    throw new Error('Hook current user and remove this throw');
  }

  // -------- Bookings --------
  @Post('services/:id/book')
  @ApiOperation({ summary: 'Book a service' })
  @ApiResponse({ status: 201, type: ServiceBooking })
  // @UseGuards(JwtAuthGuard)
  async bookService(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateBookingDto) {
    // TODO: hook current user as client
    throw new Error('Hook current user and remove this throw');
  }

  @Get('bookings/my')
  @ApiOperation({ summary: 'Get my bookings (client)' })
  // @UseGuards(JwtAuthGuard)
  async myBookings() {
    // TODO: return bookings for current user
    throw new Error('Hook current user and remove this throw');
  }

  @Get('bookings/received')
  @ApiOperation({ summary: 'Get bookings for my services (provider)' })
  // @UseGuards(JwtAuthGuard)
  async receivedBookings() {
    // TODO: return bookings for provider current user
    throw new Error('Hook current user and remove this throw');
  }

  @Put('bookings/:id/status')
  @ApiOperation({ summary: 'Update booking status' })
  // @UseGuards(JwtAuthGuard)
  async updateBookingStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    // TODO: use current user to authorize
    throw new Error('Hook current user and remove this throw');
  }
}
