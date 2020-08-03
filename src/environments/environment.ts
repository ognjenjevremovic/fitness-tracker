// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '../app/configuration/models/environment';

export const environment: Environment = {
  production: false,
  firebaseConfiguration: {
    apiKey: 'AIzaSyB3aODijGWS8RNgMO5Cst7JHw4Jin5i6zQ',
    authDomain: 'fitness-tracker-379b9.firebaseapp.com',
    databaseURL: 'localhost:8080',
    projectId: 'fitness-tracker-379b9',
    storageBucket: 'fitness-tracker-379b9.appspot.com',
    messagingSenderId: '389131834444',
    appId: '1:389131834444:web:f21096d8e99a8a657090e9'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
