import { Pipe, PipeTransform } from '@angular/core';

import { Meal } from '../models/meal.model';


@Pipe({
  name: 'ingredients',
})
export class IngredientsPipe implements PipeTransform {

  public transform(value: Meal['ingredients']): string {
    return Array.isArray(value) ? value.join(', ') : value;
  }

}
