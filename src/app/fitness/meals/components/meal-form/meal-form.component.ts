import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/models/meal.model';


@Component({
  selector: 'ft-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent {
  @Output()
  public readonly create: EventEmitter<Meal> = new EventEmitter<Meal>();

  public readonly mealForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([
      new FormControl('', [Validators.required])
    ])
  });

  public get ingredients(): FormArray {
    return this.mealForm.get('ingredients') as FormArray;
  }

  public get mealNameRequired(): boolean {
    return (
      this.mealForm.get('name').hasError('required')
      && this.mealForm.get('name').touched
    );
  }

  constructor(
    private readonly fb: FormBuilder
  ) {/** */}


  public ingredientNameRequired(controlIndex: number): boolean {
    return (
      this.ingredients.at(controlIndex).hasError('required')
      && this.ingredients.at(controlIndex).touched
    );
  }

  public addIngredient(): void {
    this.ingredients.push(new FormControl('', [Validators.required]));
  }

  public removeIngredient(controlIndex: number): void {
    this.ingredients.removeAt(controlIndex);
  }

  public createMeal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.mealForm.valid) {
      this.create.emit(this.mealForm.value);
    }
  }

}
