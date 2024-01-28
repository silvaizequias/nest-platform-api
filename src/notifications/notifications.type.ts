export type SendSmsType = {
  to: string
  from: string
  body: string
}

export type EmailFromType = {
  name?: string
  email: string
}

export type SendEmailType = {
  to: string
  from: EmailFromType
  subject: string
  text: any
  html?: any
}
