import { Injectable } from '@nestjs/common';
import * as s3 from 'aws-sdk/clients/s3';

import { S3 } from 'aws-sdk';

@Injectable()
export class S3Provider {
  private readonly _s3: s3;
  private readonly _bucketName: string;

  constructor() {
    //initialize the s3 provider
    (this._bucketName = process.env.AWS_BUCKET_NAME ?? 'AWS_BUCKET_NAME'),
      (this._s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'AWS_ACCESS_KEY_ID',
        secretAccessKey:
          process.env.AWS_SECRET_ACCESS_KEY ?? 'AWS_SECRET_ACCESS_KEY',
        s3ForcePathStyle: true,
        region: process.env.AWS_REGION ?? 'ap-south-1',
        logger: console,
      }));
  }

  //get s3
  getS3() {
    return this._s3;
  }

  //get bucket name
  getBucketName() {
    return this._bucketName;
  }

  //upload file method
  async uploadFile(file, bucket, name) {
    const s3 = this.getS3();
    const s3Params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }

  //   createBucket() {
  //     this.getS3().createBucket(
  //       { Bucket: 'testbucket', ACL: 'public-read' },
  //       (err, data) => {
  //         console.log(err, data);
  //       },
  //     );
  //   }
}

/* Create a bucket (run this once)*/
// new S3ConfigProvider().createBucket();
