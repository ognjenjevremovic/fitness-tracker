import { Component, OnDestroy, OnInit } from '@angular/core';

import { forkJoin, Observable, Subscription } from 'rxjs';

import * as firebase from 'firebase';
import { mergeMap, switchMap } from 'rxjs/operators';
import Timestamp = firebase.firestore.Timestamp;

import { Store } from '../../../../store/app.store';
import { ScheduleList } from '../../../shared/models/schedule.model';
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

  constructor(
    private readonly store: Store,
    private readonly scheduleService: ScheduleService,
    private readonly mealService: MealsService,
    private readonly workoutService: WorkoutsService
  ) {/** */}

  ngOnInit(): void {
    this.date$ = this.scheduleService.date$;
    this.schedule$ = this.scheduleService.schedule$;

    this._subscriptions = [
      this.scheduleService.date$.subscribe(),
      this.scheduleService.schedule$.subscribe()
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

  public navigateToDetails(selectedItem: SelectScheduleItemDetails): void {
    console.log(selectedItem);
  }

}
