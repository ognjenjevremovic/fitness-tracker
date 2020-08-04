import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';


@NgModule({
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    SharedModule
  ]
})
export class WorkoutsModule { }
