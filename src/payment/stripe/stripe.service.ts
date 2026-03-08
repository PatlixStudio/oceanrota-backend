import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {

  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2026-02-25.clover',
      },);
  }

  async createPaymentIntent(amount: number, metadata: any) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      metadata,
    });
  }

  async createFeaturedPaymentIntent(
    listingId: number,
    userId: number,
    amount: number,
  ) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      metadata: {
        listingId: listingId.toString(),
        userId: userId.toString(),
        type: 'FEATURED_LISTING',
      },
    });
  }

  getClient() {
    return this.stripe;
  }

  create(createStripeDto: CreateStripeDto) {
    return 'This action adds a new stripe';
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
