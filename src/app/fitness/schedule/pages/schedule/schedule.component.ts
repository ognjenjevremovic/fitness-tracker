import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../../store/app.store';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';


@Component({
  selector: 'ft-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[];

  public date$: Observable<Date>;

  constructor(
    private readonly store: Store,
    private readonly scheduleService: ScheduleService
  ) {/** */}

  ngOnInit(): void {
    this.date$ = this.scheduleService.date$;

    this._subscriptions = [
      this.scheduleService.date$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
