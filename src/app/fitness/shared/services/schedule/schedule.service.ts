import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PlatformUser } from '../../../../auth/shared/models/user.model';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../../store/app.store';
import { ScheduleItem, ScheduleList } from '../../models/schedule.model';


@Injectable()
export class ScheduleService {

  private readonly collectionReference: AngularFirestoreCollection<ScheduleItem>
    = this.db.collection('schedule');

  private readonly _currentDate$: BehaviorSubject<Timestamp> =
    new BehaviorSubject<Timestamp>(Timestamp.now());

  public readonly date$: Observable<Timestamp> = this._currentDate$
    .pipe(
      tap(timestamp => this.store.set('date', timestamp))
    );

  public readonly schedule$: Observable<ScheduleList> = this.authService.currentUser$
    .pipe(
      filter(Boolean),
      mergeMap((user: PlatformUser) => this.date$
        .pipe(
          map(date => ({ user, date })),
        )
      ),
      switchMap(({ user, date }) => this.getScheduleForUser(date, user)),
      tap((schedule: ScheduleList) => this.store.set('schedule', schedule || {}))
    );

  constructor(
    private readonly db: AngularFirestore,
    private readonly store: Store,
    private readonly authService: AuthService
  ) {/** */}

  public setNewDate(date: Date): void {
    this._currentDate$.next(
      Timestamp.fromDate(date)
    );
  }

  private getScheduleForUser(date: Timestamp, user: PlatformUser): Observable<ScheduleList> {
      return this.db
        .collection<ScheduleList>(
          'schedule',
          collectionReference =>
            collectionReference
              .where('uid', '==', user.uid)
              .where('timestamp', '>', this.getStartDate(date))
              .where('timestamp', '<', this.getEndDate(date))
              .orderBy('timestamp', 'desc')
        )
        .valueChanges({ idField: 'id' })
        .pipe(
          shareReplay(),
          map(matchingDocuments => matchingDocuments[0])
        );
  }

  private getStartDate(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return Timestamp.fromMillis(time);
  }

  private getEndDate(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1;
    return Timestamp.fromMillis(time);
  }
}
