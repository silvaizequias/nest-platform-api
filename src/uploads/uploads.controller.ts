import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { UploadsService } from './uploads.service'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadFileValidator } from './uploads.validator'

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor('file'), ClassSerializerInterceptor)
  @Post()
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000 })],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadFileValidator: UploadFileValidator,
  ) {
    return this.uploadService.uploadFile(file, uploadFileValidator)
  }
}
