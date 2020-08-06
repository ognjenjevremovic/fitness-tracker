import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { Meal } from '../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meals/meals.service';


@Component({
  selector: 'ft-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  private get mealId(): Meal['id'] {
    return this.route.snapshot.paramMap.get('id');
  }

  public meal$: Observable<Meal>;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly mealService: MealsService,
  ) { }


  ngOnInit(): void {
    this._subscription = this.mealService.meals$.subscribe();
    this.meal$ = this.route.params
      .pipe(
        switchMap(({ id: mealId }) => this.mealService.getMealById(mealId)),
        shareReplay()
      );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public async addMeal(meal: Meal): Promise<void> {
    await this.mealService.addMeal(meal);
    await this.router.navigate(['meals']);
  }

  public async editMeal(meal: Meal): Promise<void> {
    await this.mealService.editMeal(this.mealId, meal);
    await this.router.navigate(['meals']);
  }

  public async removeMeal(): Promise<void> {
    await this.mealService.removeMeal(this.mealId);
    await this.router.navigate(['meals']);
  }
}
