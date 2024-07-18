import { PutObjectCommand } from '@aws-sdk/client-s3'
import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UploadFileValidator } from './uploads.validator'
import { AWSService } from 'src/aws/aws.service'

@Injectable()
export class UploadsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsService: AWSService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    uploadFileValidator: UploadFileValidator,
  ) {
    const { bucket, name, path } = uploadFileValidator

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: path ? `${path}/${name}` : name,
      ContentType: file.mimetype,
      ContentLength: file.size,
      Body: file.buffer,
    })

    const url = `https://s3.sa-east-1.amazonaws.com/${uploadFileValidator?.bucket}/${encodeURIComponent(path ? `${path}/${name}` : name)}`

    return await this.awsService.s3Client
      .send(putObjectCommand)
      .then(() => {
        return { url: url }
      })
      .catch((error: any) => new HttpException(error?.message, error?.status))
  }
}
