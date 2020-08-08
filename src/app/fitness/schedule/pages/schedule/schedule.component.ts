import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { Store } from '../../../../store/app.store';
import { Meal } from '../../../shared/models/meal.model';
import { ScheduleList } from '../../../shared/models/schedule.model';
import { Workout } from '../../../shared/models/workout.model';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { SelectScheduleItemDetails } from '../../components/schedule-calendar/schedule-calendar.component';


@Component({
  selector: 'ft-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[];

  public date$: Observable<Timestamp>;
  public schedule$: Observable<ScheduleList>;
  public meals$: Observable<Meal[]>;
  public workouts$: Observable<Workout[]>;

  constructor(
    private readonly store: Store,
    private readonly scheduleService: ScheduleService,
    private readonly mealService: MealsService,
    private readonly workoutService: WorkoutsService
  ) {/** */}

  ngOnInit(): void {
    this.date$ = this.scheduleService.date$;
    this.schedule$ = this.store.select<ScheduleList>('schedule');
    this.meals$ = this.store.select<Meal[]>('meals');
    this.workouts$ = this.store.select<Workout[]>('workouts');

    this._subscriptions = [
      this.scheduleService.date$.subscribe(),
      this.scheduleService.schedule$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

  public setNewDate(newDate: Date): void {
    this.scheduleService.setNewDate(newDate);
  }

  public async setNewSchedule(newSchedule: Partial<ScheduleList>): Promise<void | DocumentReference> {
    if (newSchedule.id) {
      return await this.scheduleService.updateSchedule(newSchedule);
    }
    return await this.scheduleService.createNewSchedule(newSchedule as ScheduleList);
  }

  public navigateToDetails(selectedItem: SelectScheduleItemDetails): void {
    console.log(selectedItem);
  }

}
