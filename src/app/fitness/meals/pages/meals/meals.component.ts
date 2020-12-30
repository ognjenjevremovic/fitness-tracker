import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  private _subscription: Subscription;

  public meals$: Observable<Meal[]>;

  constructor(
    private readonly router: Router,
    private readonly mealsService: MealsService,
    private readonly store: Store
  ) {/** */}

  ngOnInit(): void {
    this.meals$ = this.store.select<Meal[]>('meals');
    this._subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public async navigateToMealDetails(meal: Meal): Promise<void> {
    await this.router.navigate(['meals', meal.id]);
  }

  public async onMealRemove({ id: mealId }: Meal): Promise<void> {
    await this.mealsService.removeMeal(mealId);
  }
}
