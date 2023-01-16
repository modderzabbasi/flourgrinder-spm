import {
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import constants from './constants';
import { FileDTO, FileResponseDTO } from './dto/uploadFileDto';
@Controller('upload')
export class storageController {
  constructor(
    @Inject(constants.STORAGE_PROVIDER_SERVICE) private storageProvider: any,
  ) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', { limits: { files: 1 } }))
  @ApiResponse({ status: HttpStatus.CREATED, type: FileResponseDTO })
  async upload(@UploadedFile() file: FileDTO, @Res() response) {
    try {
      // console.log(file);
      const data: FileResponseDTO = await this.storageProvider.upload(file);
      return response.status(200).json({
        message: `Image ${file.originalname} uploaded to S3`,
        data,
      });
    } catch (error: any) {
      return response
        .status(500)
        .json(`Failed to upload image to S3: ${error.message}`);
    }
  }
}
