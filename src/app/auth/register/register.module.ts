import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
  ],
})
export class RegisterModule {/** */}
