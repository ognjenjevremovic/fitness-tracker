import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Meal} from '../../models/meal.model';
import { PlatformUser } from '../../../../auth/shared/models/user.model';
import { Store } from '../../../../store/app.store';


@Injectable()
export class MealsService {

  public get meals$(): Observable<Meal[]> {
    return this.store.select<Meal[]>('meals');
  }

  public readonly mealState$: Observable<Meal[]> = this.authService.currentUser$
    .pipe(
      filter(Boolean),
      switchMap((user: PlatformUser) =>
        this.db
          .collection<Meal>(
            'meals',
              collectionReference =>
                collectionReference.where('uid', '==', user.uid)
          )
          .valueChanges(),
      ),
      switchMap((meals: Meal[] = []) => {
        this.store.set('meals', meals);
        return this.store.select<Meal[]>('meals');
      }),
    );

  constructor(
    private readonly store: Store,
    private readonly db: AngularFirestore,
    private readonly authService: AuthService,
  ) {/** */}

}
