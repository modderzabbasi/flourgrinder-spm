import { S3Provider } from './s3Provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private readonly s3Provider: S3Provider;

  constructor() {
    this.s3Provider = new S3Provider();
  }

  async upload(file) {
    const { originalname } = file;
    const S3bucket = this.s3Provider.getBucketName();
    return await this.s3Provider.uploadFile(
      file.buffer,
      S3bucket,
      originalname,
    );
  }
}
