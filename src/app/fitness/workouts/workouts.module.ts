import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';


@NgModule({
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent, WorkoutTypeComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    SharedModule
  ]
})
export class WorkoutsModule { }
