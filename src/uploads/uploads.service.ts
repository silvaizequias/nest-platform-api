import { PutObjectCommand } from '@aws-sdk/client-s3'
import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UploadFileDto } from './uploads.dto'
import { AWSService } from 'src/aws/aws.service'

@Injectable()
export class UploadsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsService: AWSService,
  ) {}

  async uploadFile(file: Express.Multer.File, uploadFileDto: UploadFileDto) {
    const { bucket, name, path } = uploadFileDto

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: path ? `${path}/${name}` : name,
      ContentType: file.mimetype,
      ContentLength: file.size,
      Body: file.buffer,
    })

    const url = `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${uploadFileDto?.bucket}/${encodeURIComponent(path ? `${path}/${name}` : name)}`

    return await this.awsService.s3Client
      .send(putObjectCommand)
      .then(() => {
        return { url: url }
      })
      .catch((error: any) => new HttpException(error?.message, error?.status))
  }
}
