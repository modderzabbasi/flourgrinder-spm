import { Injectable } from '@nestjs/common';

@Injectable()
export class MockProvider {
  async uploadFile(file) {}
}
