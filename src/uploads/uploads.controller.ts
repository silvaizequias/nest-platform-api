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
import { UploadFileDto } from './uploads.dto'

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
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.uploadService.uploadFile(file, uploadFileDto)
  }
}
