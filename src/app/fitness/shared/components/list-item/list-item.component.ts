import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Meal } from '../../models/meal.model';


@Component({
  selector: 'ft-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {

  @Input()
  item: Meal;

}
