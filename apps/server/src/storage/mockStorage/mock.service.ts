import { Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { MockProvider } from './mockProvider';

export class MockService {
  private readonly MockProvider: MockProvider;

  constructor() {
    this.MockProvider = new MockProvider();
  }

  async upload(file) {
    return await this.MockProvider.uploadFile(file);
  }
}
