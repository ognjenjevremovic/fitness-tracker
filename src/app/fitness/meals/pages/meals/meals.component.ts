import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Meal } from '../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { Store } from '../../../../store/app.store';


@Component({
  selector: 'ft-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private readonly mealsService: MealsService,
    private readonly store: Store
  ) {/** */}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onMealRemove({ id: mealId }: Meal): Promise<void> {
    await this.mealsService.removeMeal(mealId);
  }
}
