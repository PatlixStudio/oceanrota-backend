import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { StripeService } from './stripe/stripe.service';
import { MarketplaceService } from 'src/marketplace/marketplace.service';

@Injectable()
export class PaymentService {
  
  constructor(
    private stripeService: StripeService,
    private listingService: MarketplaceService, // inject your listing service
  ) { }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async createFeaturedPayment(listingId: number, userId: number) {
    const FEATURED_PRICE = 199;

    // Optional: verify listing exists & belongs to user
    const listing = await this.listingService.findOne(listingId);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.visibilityType !== 'FEATURED') {
      throw new BadRequestException('Listing is not featured');
    }

    return this.stripeService.createFeaturedPaymentIntent(
      listingId,
      userId,
      FEATURED_PRICE,
    );
  }
}
