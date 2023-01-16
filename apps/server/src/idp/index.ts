import constants from './constants';
import { FirebaseService } from './firebaseIDP/firebase.service';
import { MockService } from './mockIDP/mock.service';
const providers = [
  {
    provide: constants.IDENTITY_PROVIDER_FIREBASE,
    useClass: FirebaseService,
  },
  {
    provide: constants.IDENTITY_PROVIDER_MOCK,
    useClass: MockService,
  },
];

export function getIdentityProvider(provider: string) {
  let service = providers.find((p) => p.provide === provider);
  if (!service) {
    service = providers.find(
      (p) => p.provide === constants.IDENTITY_PROVIDER_MOCK,
    );
  }

  return [
    {
      ...service,
      ...{ provide: constants.IDENTITY_PROVIDER_SERVICE },
    },
  ];
}
