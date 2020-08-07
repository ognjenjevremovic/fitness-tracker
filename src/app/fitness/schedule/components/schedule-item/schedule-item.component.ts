import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../../../shared/models/meal.model';

import { ScheduleItem } from '../../../shared/models/schedule.model';


@Component({
  selector: 'ft-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleItemComponent {

  @Input()
  section: ScheduleItem;

  @Input()
  name: string;

  @Output()
  selected: EventEmitter<keyof ScheduleItem> = new EventEmitter<keyof ScheduleItem>();

  public getMealNames(meals: Meal[]): Meal['name'][] {
    return meals.map(meal => meal.name);
  }

  public onSelect(type: keyof ScheduleItem): void {
    this.selected.emit(type);
  }

}
