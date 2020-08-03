import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Meal } from '../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meals/meals.service';


@Component({
  selector: 'ft-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private readonly mealsService: MealsService
  ) {/** */}

  ngOnInit(): void {
    this.subscription = this.mealsService.mealState$.subscribe();
    this.meals$ = this.mealsService.meals$;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
