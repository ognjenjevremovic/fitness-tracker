import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'ft-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {

  public readonly daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  public selectedDay: number;

  @Input()
  public set selected(value: number) {
    this.selectedDay = !value ? 6 : value - 1;
  }

  @Output()
  public readonly dayChange: EventEmitter<number> = new EventEmitter<number>();

  public selectDate(dayIndex: number): void {
    //  This may be confusing at start,
    //  but days starts from Sunday
    //  making Sunday having an index of 0
    //  and Saturday having an index of 6
    this.dayChange.emit((dayIndex + 1) % 7);
  }
}
