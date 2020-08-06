import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { PlatformUser } from '../../../../auth/shared/models/user.model';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../../store/app.store';
import { Workout } from '../../models/workout.model';


@Injectable()
export class WorkoutsService {

  private readonly collectionReference: AngularFirestoreCollection<Workout>
    = this.db.collection<Workout>('workouts');

  public readonly workouts$: Observable<Workout[]> = this.authService.currentUser$
    .pipe(
      filter<PlatformUser>(Boolean),
      switchMap(
        ({ uid }) => this.db
          .collection<Workout>(
            'workouts',
            collectionRef => collectionRef.where('uid', '==', uid)
          )
          .valueChanges({ idField: 'id' })
      ),
      shareReplay(),
      tap((workouts) => this.store.set('workouts', workouts || []))
    );

  constructor(
    private readonly db: AngularFirestore,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {/** */}

  public getWorkoutById(workoutId: Workout['id']): Observable<Workout> {
    if (!workoutId) {
      return of({} as Workout);
    }
    return this.store.select<Workout[]>('workouts')
      .pipe(
        filter(Boolean),
        map(
          (workouts: Workout[]) =>
            workouts.find(workout => workout.id === workoutId)
        )
      );
  }

  public addWorkout(workout: Workout): Promise<DocumentReference> {
    return this.store.select<PlatformUser>('user')
      .pipe(
        distinctUntilChanged(),
        switchMap(
          (user: PlatformUser) =>
            this.collectionReference
              .add({ ...workout, uid: user.uid, timestamp: Timestamp.now() }),
        ),
        take(1),
      ).toPromise();
  }

  public editWorkout(workoutId: Workout['id'], workout: Partial<Workout>): Promise<void> {
    return this.collectionReference
      .doc(workoutId)
      .set(
        { ...workout, lastEdit: Timestamp.now() },
        { merge: true }
      );
  }

  public removeWorkout(workoutId: Workout['id']): Promise<void> {
    return this.collectionReference
      .doc(workoutId)
      .delete();
  }
}
