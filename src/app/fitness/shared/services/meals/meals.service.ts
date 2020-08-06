import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

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
      filter<PlatformUser>(Boolean),
      switchMap((user: PlatformUser) =>
        this.db
          .collection<Meal>(
            'meals',
              collectionReference =>
                collectionReference.where('uid', '==', user.uid)
          )
          .valueChanges({ idField: 'id' }),
      ),
      shareReplay(),
      tap((meals: Meal[] = []) => this.store.set('meals', meals || [])),
    );

  constructor(
    private readonly store: Store,
    private readonly db: AngularFirestore,
    private readonly authService: AuthService,
  ) {/** */}

  public getMealById(mealId: Meal['id']): Observable<Meal> {
    if (!mealId) {
      return of({} as Meal);
    }
    return this.store.select<Meal[]>('meals')
      .pipe(
        filter(Boolean),
        map(
          (meals: Meal[]) =>
            meals.find(meal => meal.id === mealId)
        )
      );
  }

  public addMeal(meal: Meal): Promise<DocumentReference> {
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

  public editMeal(mealId: string, meal: Meal): Promise<void> {
    return this.collectionReference
      .doc<Meal>(mealId)
      .set(
        { ...meal, lastEdit: Timestamp.now() },
        { merge: true }
      );
  }

  public removeMeal(mealId: Meal['id']): Promise<void> {
    return this.collectionReference
      .doc(mealId)
      .delete();
  }

}
