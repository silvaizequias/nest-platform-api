import { Injectable } from '@nestjs/common'
import * as sendgrid from '@sendgrid/mail'
import { Twilio } from 'twilio'
import { SendEmailType, SendSmsType } from './notifications.type'

@Injectable()
export class NotificationsService {
  async sendSms(data: SendSmsType) {
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

    const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    return await twilio.messages.create(data)
  }

  async sendEmail(data: SendEmailType) {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    sendgrid.setApiKey(SENDGRID_API_KEY)
    return await sendgrid.send(data)
  }
}
