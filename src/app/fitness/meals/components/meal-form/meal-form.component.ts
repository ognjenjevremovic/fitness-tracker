import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/models/meal.model';


@Component({
  selector: 'ft-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnChanges {
  @Input()
  public readonly meal: Meal;

  @Output()
  public readonly create: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  public readonly update: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  public readonly delete: EventEmitter<void> = new EventEmitter<void>();

  public editingMeal = false;

  public readonly mealForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([
      this.mealIngredientFormControl(),
    ]),
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
    private readonly fb: FormBuilder,
  ) {/** */}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && !!Object.keys(this.meal).length) {
      this.editingMeal = true;
      this.emptyMealIngredients();
      this.mealForm.patchValue(this.meal);

      for (const ingredient of this.meal.ingredients) {
        this.ingredients.push(this.mealIngredientFormControl(ingredient));
      }
    }
  }


  public ingredientNameRequired(controlIndex: number): boolean {
    return (
      this.ingredients.at(controlIndex).hasError('required')
      && this.ingredients.at(controlIndex).touched
    );
  }

  public addIngredient(): void {
    this.ingredients.push(this.mealIngredientFormControl());
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

  public updateMeal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.mealForm.valid) {
      this.update.emit(this.mealForm.value);
    }
  }

  public deleteMeal(): void {
    this.delete.emit();
  }

  private emptyMealIngredients(): void {
    while (this.ingredients.length) {
      this.ingredients.removeAt(0);
    }
  }

  private mealIngredientFormControl(ingredient: string = ''): FormControl {
    return new FormControl(ingredient, [Validators.required]);
  }

}
