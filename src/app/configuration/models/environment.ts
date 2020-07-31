import { Configuration } from './configuration';

export interface Environment {
  production: boolean;
  firebaseConfiguration: Configuration;
}
