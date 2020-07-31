import { FirebaseConfiguration } from './configuration';

export interface Environment {
  production: boolean;
  firebaseConfiguration: FirebaseConfiguration;
}
