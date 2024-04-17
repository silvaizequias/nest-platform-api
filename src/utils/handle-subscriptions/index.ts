import Stripe from 'stripe'
import {
  CreatePaymentCustomerType,
  PaymentCheckoutType,
  PaymentWebhookType,
} from './types'

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
  const { credit, document, paymentCustomerId, subscriptionId, url } = options

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
      success_url: `${url}/${document}`,
      cancel_url: `${url}/${document}`,
      metadata: {
        credit,
        subscriptionId,
      },
    })
    .then((data) => data)
}

export const paymentWebhook = async (inputs: PaymentWebhookType) => {
  const { body, signature } = inputs

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET ?? '',
  )

  const session = event.data.object as Stripe.Checkout.Session
  const metadata = session?.metadata

  if (!metadata)
    return new Response(JSON.stringify('unauthorized'), { status: 400 })

  switch (event.type) {
    case 'checkout.session.completed':
      await stripe.subscriptions
        .retrieve(session.subscription as string)
        .then((data) => console.log('completed: ', data))
        .catch((error) => console.log('completed_error: ', error))
      break

    case 'invoice.payment_succeeded':
      await stripe.subscriptions
        .retrieve(session.subscription as string)
        .then((data) => console.log('succeeded: ', data))
        .catch((error) => console.log('succeeded_error: ', error))
      break

    default:
      console.log(`unhandled event type ${event.type}`)
  }

  return new Response(null, { status: 200 })
}
