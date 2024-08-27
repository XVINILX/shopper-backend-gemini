import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,

    @InjectRepository(TransportRepository)
    private transportRepository: TransportRepository,
  ) {
    this.stripe = new Stripe('your-stripe-secret-key', {
      apiVersion: '2020-08-27',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  }

  async confirmPayment(transportId: string, paymentIntentId: string) {
    const transport = await this.transportRepository.findOne(transportId);
    if (!transport) throw new Error('Transport not found');

    const payment = this.paymentRepository.create({
      stripePaymentId: paymentIntentId,
      amount: transport.amount, // Example amount
      transport,
    });

    await this.paymentRepository.save(payment);

    return payment;
  }
}
