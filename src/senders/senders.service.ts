import { HttpException, Injectable } from '@nestjs/common'
import { AWSService } from 'src/aws/aws.service'
import { SendEmailValidator, SendSMSValidator } from './senders.validator'
import { SendEmailCommand } from '@aws-sdk/client-ses'
import { PublishCommand } from '@aws-sdk/client-sns'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SendersService {
  constructor(
    private awsService: AWSService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(sendEmailValidator: SendEmailValidator) {
    const { to, bcc, subject, message } = sendEmailValidator

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [to],
        BccAddresses: [bcc ?? ''],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
      },
      Source: this.configService.getOrThrow('EMAIL_SENDER'),
    })
    return await this.awsService.sesClient
      .send(sendEmailCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new HttpException(error?.message, error?.status))
  }

  async sendSMS(sendSMSValidator: SendSMSValidator) {
    const { to, message } = sendSMSValidator

    const publishCommand = new PublishCommand({
      Message: message,
      PhoneNumber: '+' + to,
    })
    return await this.awsService.snsClient
      .send(publishCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new HttpException(error?.message, error?.status))
  }
}
