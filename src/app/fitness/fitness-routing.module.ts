import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: () => import('./meals/meals.module')
      .then(m => m.MealsModule),
  },
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: () => import('./schedule/schedule.module')
      .then(m => m.ScheduleModule),
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./workouts/workouts.module')
      .then(m => m.WorkoutsModule),
  },
  { path: '**', redirectTo: 'schedule' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessRoutingModule {/** */}
