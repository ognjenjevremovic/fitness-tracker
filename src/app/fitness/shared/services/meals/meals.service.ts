import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import { defer, Observable } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs/operators';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Meal} from '../../models/meal.model';
import { PlatformUser } from '../../../../auth/shared/models/user.model';
import { Store } from '../../../../store/app.store';


@Injectable()
export class MealsService {
  private readonly collectionReference: AngularFirestoreCollection<Meal>
    = this.db.collection<Meal>('meals');

  public readonly meals$: Observable<Meal[]> = this.authService.currentUser$
    .pipe(
      filter(Boolean),
      switchMap((user: PlatformUser) =>
        this.db
          .collection<Meal>(
            'meals',
              collectionReference =>
                collectionReference.where('uid', '==', user.uid)
          )
          .valueChanges({ idField: 'id' }),
      ),
      tap((meals: Meal[] = []) => {
        this.store.set('meals', meals || []);
      }),
    );

  constructor(
    private readonly store: Store,
    private readonly db: AngularFirestore,
    private readonly authService: AuthService,
  ) {/** */}

  addMeal(meal: Meal): Promise<DocumentReference> {
    return this.store.select<PlatformUser>('user')
      .pipe(
        distinctUntilChanged(),
        switchMap(user =>
          this.collectionReference
            .add({ ...meal, uid: user.uid, timestamp: Timestamp.now() })
        ),
        take(1)
      ).toPromise();
  }

  removeMeal(meal: Meal): Promise<void> {
    return this.db.collection('meals').doc(meal.id).delete();
  }

}
