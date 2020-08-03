import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './pages/meals/meals.component';


@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule
  ]
})
export class MealsModule { }
