import { InjectionToken, Provider } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Configuration } from '../models/configuration';


export const CONFIGURATION_TOKEN: InjectionToken<Configuration> =
  new InjectionToken<Configuration>('CONFIGURATION_TOKEN');


export const ConfigurationProvider: Provider = {
  provide: CONFIGURATION_TOKEN,
  useValue: environment.firebaseConfiguration
};
