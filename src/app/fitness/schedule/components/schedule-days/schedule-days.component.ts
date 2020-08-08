import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'ft-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent {

  public readonly daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  public selected: number;

  @Output()
  public readonly select: EventEmitter<number> = new EventEmitter<number>();

  public selectDate(dayIndex: number): void {
    this.select.emit(dayIndex);
  }
}
