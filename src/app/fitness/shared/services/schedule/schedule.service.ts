import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as firebase from 'firebase';
import { map, tap } from 'rxjs/operators';
import Timestamp = firebase.firestore.Timestamp;

import { Store } from '../../../../store/app.store';


@Injectable()
export class ScheduleService {

  private readonly _currentDate$: BehaviorSubject<Timestamp> =
    new BehaviorSubject<Timestamp>(Timestamp.now());

  public readonly date$: Observable<Date> = this._currentDate$
    .pipe(
      map(timestamp => timestamp.toDate()),
      tap(date => this.store.set('date', date))
    );

  constructor(
    private readonly store: Store
  ) {/** */}

  public setNewDate(date: Date): void {
    this._currentDate$.next(
      Timestamp.fromDate(date)
    );
  }
}
