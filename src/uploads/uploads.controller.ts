import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
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
import { UploadFileDto } from './dto/upload-file.dto'
import { AuthorizationJWTGuard } from 'src/authorization/authorization.guard'
import { Profiles } from 'src/users/users.decorator'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { UsersGuard } from 'src/users/users.guard'

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
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
