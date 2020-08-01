import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module')
      .then(m => m.MealsModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module')
      .then(m => m.ScheduleModule)
  },
  {
    path: 'workouts',
    loadChildren: () => import('./workouts/workouts.module')
      .then(m => m.WorkoutsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessRoutingModule { }
