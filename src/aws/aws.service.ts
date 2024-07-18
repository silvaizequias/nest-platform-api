import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'
import { S3Client } from '@aws-sdk/client-s3'
import { SESClient } from '@aws-sdk/client-ses'
import { SNSClient } from '@aws-sdk/client-sns'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AWSCredential } from './aws.interface'

@Injectable()
export class AWSService {
  constructor(private readonly configService: ConfigService) {}

  private readonly defaultRegion = 'sa-east-1'

  private readonly credentials: AWSCredential = {
    accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
    secretAccessKey: this.configService.getOrThrow('AWS_PRIVATE_KEY'),
  }

  readonly bedrockRuntimeClient = new BedrockRuntimeClient({
    region: this.defaultRegion,
    credentials: this.credentials,
  })

  readonly s3Client = new S3Client({
    region: this.defaultRegion,
    credentials: this.credentials,
  })

  readonly sesClient = new SESClient({
    region: this.defaultRegion,
    credentials: this.credentials,
  })

  readonly snsClient = new SNSClient({
    region: this.defaultRegion,
    credentials: this.credentials,
  })
}
