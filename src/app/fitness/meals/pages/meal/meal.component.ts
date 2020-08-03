import { Component } from '@angular/core';

import { Meal } from '../../../shared/models/meal.model';


@Component({
  selector: 'ft-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  constructor() { }

  addMeal(meal: Meal): void {
    console.log(meal);
  }

}
