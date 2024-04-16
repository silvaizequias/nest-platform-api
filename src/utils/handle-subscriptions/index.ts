import Stripe from 'stripe'
import { CreatePaymentCustomerType, PaymentCheckoutType } from './types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

export const createPaymentCustomer = async (
  inputs: CreatePaymentCustomerType,
) => {
  const {
    name,
    email,
    phone,
    document,
    zipCode,
    street,
    complement,
    city,
    state,
  } = inputs

  return await stripe.customers
    .create({
      name: name,
      email: email,
      phone: phone,
      address: {
        postal_code: zipCode,
        line1: street,
        line2: complement,
        city: city,
        state: state,
      },
      metadata: {
        document,
      },
    })
    .then((data) => data)
}

export const paymentCheckout = async (options: PaymentCheckoutType) => {
  const { credit, document, paymentCustomerId, subscriptionId } = options

  return await stripe.checkout.sessions
    .create({
      customer: paymentCustomerId,
      phone_number_collection: { enabled: true },
      mode: 'payment',
      currency: 'brl',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: credit,
          price_data: {
            currency: 'BRL',
            unit_amount: 1.2 * 100,
            product_data: {
              name: 'plataforma dedicado',
              description: 'créditos para a organização na plataforma',
            },
          },
        },
      ],
      success_url: `https://dedicado.digital/${document}`,
      cancel_url: `https://dedicado.digital/${document}`,
      metadata: {
        credit,
        subscriptionId,
      },
    })
    .then((data) => data)
}
