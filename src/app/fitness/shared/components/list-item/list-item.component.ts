import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Meal } from '../../models/meal.model';


@Component({
  selector: 'ft-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  public showDelete = false;

  @Input()
  item: Meal;

  @Output()
  remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  removeMeal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.remove.emit(this.item);
  }

  toggleDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.showDelete = !this.showDelete;
  }

}
