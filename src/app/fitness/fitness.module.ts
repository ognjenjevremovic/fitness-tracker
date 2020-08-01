import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitnessRoutingModule } from './fitness-routing.module';

import { MealsModule } from './meals/meals.module';
import { ScheduleModule } from './schedule/schedule.module';
import { WorkoutsModule } from './workouts/workouts.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FitnessRoutingModule,
    MealsModule,
    ScheduleModule,
    WorkoutsModule
  ]
})
export class FitnessModule { }
