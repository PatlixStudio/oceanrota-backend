import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeModule } from './stripe/stripe.module';
import { MarketplaceModule } from 'src/marketplace/marketplace.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [StripeModule, MarketplaceModule],
})
export class PaymentModule {}
