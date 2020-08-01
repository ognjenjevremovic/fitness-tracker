import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  providers: [
    { provide: Store, useFactory: () => new Store() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
