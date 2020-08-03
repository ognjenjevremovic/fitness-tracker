import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { Store } from './store/app.store';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { FitnessModule } from './fitness/fitness.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FitnessModule,
    AngularFireModule.initializeApp({
      ...environment.firebaseConfiguration,
    }),
    AngularFirestoreModule,
  ],
  providers: [
    {
      provide: Store,
      useFactory: () => new Store(/** initial state is defined in the Store constructor */)
    },
    {
      provide: FIRESTORE_SETTINGS,
      useFactory: () => !environment.production
        ? { host: environment.firebaseConfiguration.databaseURL, ssl: false }
        : {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
