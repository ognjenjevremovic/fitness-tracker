import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './pages/meals/meals.component';
import { MealComponent } from './pages/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';


@NgModule({
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent,
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
  ],
})
export class MealsModule {/** */}
