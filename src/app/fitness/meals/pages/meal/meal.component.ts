import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defer } from 'rxjs';

import { Meal } from '../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meals/meals.service';


@Component({
  selector: 'ft-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  constructor(
    private readonly router: Router,
    private readonly mealService: MealsService,
  ) { }

  public async addMeal(meal: Meal): Promise<void> {
    await this.mealService.addMeal(meal);
    await this.router.navigate(['meals']);
  }

}
