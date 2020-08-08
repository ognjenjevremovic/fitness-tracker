import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseModelWithName, SimpleInfo } from '../../../shared/models/base.model';
import { ScheduleItem } from '../../../shared/models/schedule.model';


@Component({
  selector: 'ft-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleModalComponent {

  @Input()
  public typeOfData: keyof ScheduleItem;

  @Input()
  public selectedData: SimpleInfo[] = [];

  @Input()
  public availableData: BaseModelWithName[];


  @Output()
  public readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public readonly assign: EventEmitter<SimpleInfo[]> = new EventEmitter<SimpleInfo[]>();

  public isSelected({ id }: BaseModelWithName): boolean {
    return !!this.selectedData.find(item => item.id === id);
  }

  public select(item: BaseModelWithName): void {
    this.selectedData = this.getArrayWithUniqueItems(this.selectedData, item);
  }

  public assignData(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.assign.emit(this.selectedData);
    this.closed.emit();
  }

  public closeModal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.closed.emit();
  }

  private getArrayWithUniqueItems(list: SimpleInfo[], item: BaseModelWithName): SimpleInfo[] {
    return this.itemExistsInList(list, item)
      ? this.removeItemFromList(list, item).map(this.flatten.bind(this))
      : this.addItemToList(list, item).map(this.flatten.bind(this));
  }

  private itemExistsInList(list: SimpleInfo[], { id }: BaseModelWithName): boolean {
    return !!list.find(item => item.id === id);
  }

  private removeItemFromList(list: SimpleInfo[], { id }: BaseModelWithName): SimpleInfo[] {
    return list.filter(item => item.id !== id);
  }

  private addItemToList(list: SimpleInfo[], item: BaseModelWithName): SimpleInfo[] {
    return [...list, item];
  }

  private flatten({ id, name }: BaseModelWithName): SimpleInfo {
    return { id, name };
  }
}
