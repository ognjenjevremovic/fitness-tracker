import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { PlatformUser } from '../auth/shared/models/user.model';


export interface State {
  user: PlatformUser;
  [key: string]: any;
}

const initialAppState: State = {
  user: null,
};

@Injectable()
export class Store {
  private readonly _state$: BehaviorSubject<State>;

  get state$(): Observable<State> {
    return this._state$.pipe(
      distinctUntilChanged()
    );
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
