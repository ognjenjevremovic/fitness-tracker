import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { Meal } from '../../../shared/models/meal.model';
import { Schedule, ScheduleItem, ScheduleList } from '../../../shared/models/schedule.model';
import { Workout } from '../../../shared/models/workout.model';
import { SCHEDULE_TOKEN } from '../../../shared/tokens/schedule.token';


export interface SelectScheduleItemDetails {
  type: keyof ScheduleItem;
  payload: Meal | Workout;
}


@Component({
  selector: 'ft-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCalendarComponent implements OnChanges {

  public selectedDay: Date;
  public selectedWeek: Date;
  public selectedDayIndex: number;

  @Input()
  public set date(value: Timestamp) {
    this.selectedDay = value.toDate();
  }

  @Input()
  schedule: ScheduleList;

  @Output()
  public readonly changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  changeSelectedSectionDetails: EventEmitter<SelectScheduleItemDetails> =
    new EventEmitter<SelectScheduleItemDetails>();

  public get sectionList(): string[] {
    return Object.keys(this.sections);
  }

  constructor(
    @Inject(SCHEDULE_TOKEN) public readonly sections: Schedule,
  ) {/** */}

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(new Date(this.selectedDay));
  }

  public getSectionName(section: string): string {
    return this.sections[section];
  }

  public getSectionDetails(section: string): ScheduleItem {
    return this.schedule ? this.schedule[section] : {};
  }

  public onSelected(type: keyof ScheduleItem, section: ScheduleItem): void {
    // this.changeSelectedSectionDetails.emit({
    //   type,
    //   payload: section && section[type] || ({} as Workout | Meal),
    // });
  }

  public updateDate(offset: number): void {
    const startOfTheWeek = this.getStartOfTheWeek(this.selectedDay);
    const newDate = new Date(
      startOfTheWeek.getFullYear(), startOfTheWeek.getMonth(), startOfTheWeek.getDate(),
    );
    newDate.setDate(newDate.getDate() + 7 * offset);
    this.selectedDayIndex = newDate.getDay() + 1;
    this.changeDate.emit(newDate);
  }

  public selectDay(selectedDayIndex: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + selectedDayIndex);
    this.changeDate.emit(selectedDay);
  }

  private getStartOfTheWeek(date = new Date()): Date {
    const dayOfTheWeek = date.getDay();       //  e.g. Thursday = 4
    const currentDate = date.getDate();       //  e.g. 6th of August = 6
    const startOfTheWeek = currentDate - dayOfTheWeek + (!dayOfTheWeek ? -6 : 1);
    return new Date(date.setDate(startOfTheWeek));
  }

  private getToday(date: Date): number {
    const today = date.getDay() - 1;
    return today < 0 ? 6 : today;
  }

}
