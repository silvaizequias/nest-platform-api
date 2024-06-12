import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UploadFileDto } from './uploads.dto'

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_PRIVATE_KEY'),
    },
  })

  async uploadFile(file: Express.Multer.File, uploadFileDto: UploadFileDto) {
    try {
      const params = {
        Bucket: uploadFileDto?.bucket,
        Key: uploadFileDto?.name,
        ContentType: file.mimetype,
        ContentLength: file.size,
        Body: file.buffer,
      }
      const putObjectCommand = new PutObjectCommand(params)

      const url = `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${uploadFileDto?.bucket}/${encodeURIComponent(params.Key)}`

      return await this.s3Client
        .send(putObjectCommand)
        .then(() => {
          return { url: url }
        })
        .catch((error: any) => error?.message)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
