import constants from './constants';
import { S3Service } from './s3Storage/s3.service';
import { MockService } from './mockStorage/mock.service';
const providers = [
  {
    provide: constants.STORAGE_PROVIDER_S3,
    useClass: S3Service,
  },
  {
    provide: constants.STORAGE_PROVIDER_MOCK,
    useClass: MockService,
  },
];

export function getStorageProvider(provider: string) {
  let service = providers.find((p) => p.provide === provider);
  if (!service) {
    service = providers.find(
      (p) => p.provide === constants.STORAGE_PROVIDER_MOCK,
    );
  }

  return [
    {
      ...service,
      ...{ provide: constants.STORAGE_PROVIDER_SERVICE },
    },
  ];
}
