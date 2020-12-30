import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { PlatformUser } from '../../../../auth/shared/models/user.model';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../../store/app.store';
import { ScheduleList } from '../../models/schedule.model';

import { DatesUtil } from '../../utils/dates.util';


@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  private readonly collectionReference: AngularFirestoreCollection<ScheduleList>
    = this.db.collection('schedule');

  private readonly _currentDate$: BehaviorSubject<Timestamp> =
    new BehaviorSubject<Timestamp>(
      DatesUtil.getStartOfTheDay(Timestamp.now())
    );

  public readonly date$: Observable<Timestamp> = this._currentDate$
    .pipe(
      tap(timestamp => this.store.set('date', timestamp)),
    );

  public readonly schedule$: Observable<ScheduleList> = this.authService.currentUser$
    .pipe(
      filter(Boolean),
      switchMap((user: PlatformUser) => this.date$
        .pipe(
          map(date => ({ user, date })),
        ),
      ),
      switchMap(({ user, date }) => this.getScheduleForUser(date, user)),
      tap((schedule: ScheduleList) => this.store.set('schedule', schedule || {})),
    );

  constructor(
    private readonly db: AngularFirestore,
    private readonly store: Store,
    private readonly authService: AuthService,
  ) {/** */}

  public setNewDate(date: Timestamp): void {
    this._currentDate$.next(date);
  }

  public createNewSchedule(newSchedule: ScheduleList): Promise<DocumentReference> {
    return this.store.select<PlatformUser>('user')
      .pipe(
        distinctUntilChanged(),
        switchMap(({ uid }: PlatformUser) =>
          this.collectionReference
            .add({ ...newSchedule, uid }),
        ),
        take(1),
      ).toPromise();
  }

  private getScheduleForUser(date: Timestamp, user: PlatformUser): Observable<ScheduleList> {
    return this.db
      .collection<ScheduleList>(
        'schedule',
        collectionReference =>
          collectionReference
            .where('uid', '==', user.uid)
            .where('timestamp', '==', DatesUtil.getStartOfTheDay(date))
            .where('timestamp', '<', DatesUtil.getEndOfTheDay(date))
            .orderBy('timestamp', 'desc'),
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        shareReplay(),
        map(matchingDocuments => matchingDocuments[0]),
      );
  }

  public updateSchedule(newSchedule: Partial<ScheduleList>): Promise<void> {
    return this.collectionReference
      .doc(newSchedule.id)
      .set(newSchedule);
  }
}
