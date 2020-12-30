import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Meal } from '../../models/meal.model';
import { Workout } from '../../models/workout.model';


@Component({
  selector: 'ft-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input()
  item: Meal | Workout;

  @Output()
  public readonly remove: EventEmitter<Meal | Workout> = new EventEmitter<Meal | Workout>();

  @Output()
  public readonly navigate: EventEmitter<void> = new EventEmitter<void>();

  public removeItem(): void {
    this.remove.emit(this.item);
  }

  public navigateToItemDetails(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.navigate.emit();
  }
}
