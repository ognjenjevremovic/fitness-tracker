import { Component, Input } from '@angular/core';


@Component({
  selector: 'ft-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent {

  @Input()
  date: Date;

}
