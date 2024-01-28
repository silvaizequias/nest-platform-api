import { Injectable } from '@nestjs/common'
import * as sendgrid from '@sendgrid/mail'
import twilio from 'twilio'
import { SendEmailType, SendSmsType } from './notifications.type'

@Injectable()
export class NotificationsService {
  async sendSms(data: SendSmsType) {
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    return client.messages
      .create(data)
      .then(async (message: any) => {
        console.log('TWILIO: ', message?.sid)
      })
      .catch((error: any) => {
        console.error('TWILIO ERROR: ', error?.status)
      })
  }

  async sendEmail(data: SendEmailType) {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    sendgrid.setApiKey(SENDGRID_API_KEY)
    return sendgrid
      .send(data)
      .then(async () => {})
      .catch((error: any) => {
        console.error('SENDGRID ERROR: ', error)
      })
  }
}
