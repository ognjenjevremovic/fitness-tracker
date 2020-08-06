import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ft-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent {

  public offset = 0;
  public selectedDate: Date;

  @Input()
  public set selected(value: Date) {
    this.selectedDate = value;
  }

  @Output()
  public readonly move: EventEmitter<number> = new EventEmitter<number>();

  public moveOffset(offset: number): void {
    this.offset = offset;
    this.move.emit(offset);
  }
}
