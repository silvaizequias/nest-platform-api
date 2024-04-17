export type CreatePaymentCustomerType = {
  name: string
  email: string
  phone: string
  document: string
  zipCode: string
  street?: string
  complement: string
  city?: string
  state?: string
}

export type PaymentCheckoutType = {
  credit: number
  document: string
  paymentCustomerId: string
  subscriptionId: string
  url: string
}

export type PaymentWebhookType = {
  body: any
  signature: string
}
