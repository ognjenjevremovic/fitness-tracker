import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { Meal } from '../fitness/shared/models/meal.model';
import { PlatformUser } from '../auth/shared/models/user.model';
import { ScheduleList } from '../fitness/shared/models/schedule.model';
import { Workout } from '../fitness/shared/models/workout.model';


export interface State {
  user: PlatformUser;
  meals: Meal[];
  date: Timestamp;
  workouts: Workout[];
  schedule: ScheduleList;
  [key: string]: any;
}

const initialAppState: State = {
  user: null,
  meals: null,
  date: null,
  schedule: null,
  workouts: null
};


@Injectable()
export class Store {
  private readonly _state$: BehaviorSubject<State>;

  get state$(): Observable<Partial<State>> {
    return this._state$.pipe(
      distinctUntilChanged()
    );
  }

  get stateSnapshot(): Partial<State> {
    return this._state$.getValue();
  }

  constructor(initialState: State = initialAppState) {
    this._state$ = new BehaviorSubject<State>(initialState);
  }

  select<T>(slice: keyof State): Observable<T> {
    return this._state$.pipe(
      pluck(slice)
    );
  }

  set(slice: keyof State, state: unknown): void {
    this._state$.next({
      ...this._state$.getValue(),
      [slice]: state
    });
  }
}
