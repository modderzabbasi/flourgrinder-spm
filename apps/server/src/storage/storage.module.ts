import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { getStorageProvider } from '.';
import { storageController } from './storage.controller';

@Module({
  controllers: [storageController],
  providers: [],
  exports: [],
})
export class StorageModule {
  static forRoot(provider: string): DynamicModule {
    const service = getStorageProvider(provider);
    return {
      module: StorageModule,
      exports: service,
      providers: service,
    };
  }
}
