import { Module } from '@nestjs/common';
import { IDPService } from './idp.service';

@Module({
  imports: [],
  controllers: [],
  providers: [IDPService],
  exports: [IDPService],
})
export class IDPModule {}
