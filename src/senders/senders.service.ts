import { HttpException, Injectable } from '@nestjs/common'
import { AWSService } from 'src/aws/aws.service'
import { SendEmailDto, SendSMSDto } from './senders.dto'
import { SendEmailCommand } from '@aws-sdk/client-ses'
import { PublishCommand } from '@aws-sdk/client-sns'

@Injectable()
export class SendersService {
  constructor(private awsService: AWSService) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { to, bcc, from, subject, message } = sendEmailDto

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
      Source: from,
    })
    return await this.awsService.sesClient
      .send(sendEmailCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new HttpException(error?.message, error?.status))
  }

  async sendSMS(sendSMSDto: SendSMSDto) {
    const { to, message } = sendSMSDto

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
