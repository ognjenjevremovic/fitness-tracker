import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
  ],
})
export class LoginModule {/** */}
