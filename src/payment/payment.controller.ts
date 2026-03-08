import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FeaturedPlan } from 'src/common/enums/listing-enums';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('featured')
  async createFeaturedPayment(
    @Body() body: { listingId: number, featuredPlan: FeaturedPlan },
    @Req() req: any, // assuming auth middleware
  ) {

    const userId = req.user.id;
    const paymentIntent =
      await this.paymentService.createFeaturedPayment(
        userId,
        body.listingId,
        body.featuredPlan
      );

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
