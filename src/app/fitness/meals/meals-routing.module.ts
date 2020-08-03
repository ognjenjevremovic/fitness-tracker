import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealComponent } from './pages/meal/meal.component';
import { MealsComponent } from './pages/meals/meals.component';

const routes: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
