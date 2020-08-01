import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginModule,
    RegisterModule,
    SharedModule.forRoot(),
    AngularFireModule.initializeApp({
      ...environment.firebaseConfiguration,
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
})
export class AuthModule {/** */}
