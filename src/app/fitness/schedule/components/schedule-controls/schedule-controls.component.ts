import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


@Component({
  selector: 'ft-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  public offset = 0;
  public selectedDate: Date;

  @Input()
  public set selected(value: Timestamp) {
    this.selectedDate = value.toDate();
  }

  @Output()
  public readonly weekChange: EventEmitter<number> = new EventEmitter<number>();

  public moveOffset(offset: number): void {
    this.offset = offset;
    this.weekChange.emit(offset);
  }
}
