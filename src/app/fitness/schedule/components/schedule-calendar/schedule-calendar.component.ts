import {
  ChangeDetectionStrategy,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  ViewChild, ViewContainerRef,
} from '@angular/core';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { BaseModelWithName, SimpleInfo } from '../../../shared/models/base.model';
import { Meal } from '../../../shared/models/meal.model';
import { Schedule, ScheduleItem, ScheduleList, Section } from '../../../shared/models/schedule.model';
import { Workout } from '../../../shared/models/workout.model';
import { SCHEDULE_TOKEN } from '../../../shared/tokens/schedule.token';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';


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

  private componentRef: ComponentRef<ScheduleModalComponent>;
  private modalComponentFactory: ComponentFactory<ScheduleModalComponent>
    = this.componentFactoryResolver
    .resolveComponentFactory<ScheduleModalComponent>(ScheduleModalComponent);

  public selectedDay: Date;
  public selectedWeek: Date;
  public selectedDayIndex: number;

  @Input()
  public set date(value: Timestamp) {
    this.selectedDay = value.toDate();
  }

  @Input()
  schedule: ScheduleList;

  @Input()
  mealsList: Meal[];

  @Input()
  workoutsList: Workout[];

  @Output()
  public readonly changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  public readonly changeSelectedSectionDetails: EventEmitter<SelectScheduleItemDetails> =
    new EventEmitter<SelectScheduleItemDetails>();

  @Output()
  public readonly changeSchedule: EventEmitter<ScheduleList> =
    new EventEmitter<ScheduleList>();

  @ViewChild('modalPlaceholder', { read: ViewContainerRef })
  public readonly modalContainer: ViewContainerRef;

  public get sectionList(): Section[] {
    return Object.keys(this.sections) as Section[];
  }

  constructor(
    @Inject(SCHEDULE_TOKEN) public readonly sections: Schedule,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {/** */}

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(new Date(this.selectedDay));
  }

  private openModal(type: keyof ScheduleItem, section: Section): void {
    this.componentRef = this.modalContainer
      .createComponent<ScheduleModalComponent>(this.modalComponentFactory);
    const instance = this.componentRef.instance;

    instance.closed
      .subscribe(() => this.closeModal());
    instance.assign
      .subscribe(
        (data: SimpleInfo[]) =>
          this.changeSchedule.emit({
            ...this.schedule,
            [section]: {
              ...this.schedule[section],
              [type]: data
            },
            timestamp: Timestamp.fromDate(this.selectedDay)
          })
      );

    console.log('this.schedule', this.schedule);
    console.log('this.schedule[section]', this.schedule[section]);

    instance.typeOfData = type;
    instance.availableData = this.getModalListData(type) || [];
    instance.selectedData = this.getSectionDetails(section)[type] || [];
  }

  private getModalListData(type: keyof ScheduleItem): BaseModelWithName[] {
    return type === 'meals' ? this.mealsList : this.workoutsList;
  }

  public getSectionDetails(section: Section): ScheduleItem {
    return (this.schedule && this.schedule[section]) || ({} as ScheduleItem);
  }

  public getSectionName(section: Section): string {
    return this.sections[section];
  }

  private closeModal(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.modalContainer.clear();
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
