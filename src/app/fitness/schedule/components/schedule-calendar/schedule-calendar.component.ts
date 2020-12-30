import {
  ChangeDetectionStrategy, Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef, EventEmitter,
  Inject, Input, OnChanges, Output, ViewChild, ViewContainerRef,
} from '@angular/core';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { BaseModelWithName, SimpleInfo } from '../../../shared/models/base.model';
import { Meal } from '../../../shared/models/meal.model';
import { Schedule, ScheduleItem, ScheduleList, Section } from '../../../shared/models/schedule.model';
import { Workout } from '../../../shared/models/workout.model';
import { SCHEDULE_TOKEN } from '../../../shared/tokens/schedule.token';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';

import { DatesUtil } from '../../../shared/utils/dates.util';


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

  public selectedDay: Timestamp;
  public selectedWeek: Timestamp;
  public selectedDayIndex: number;

  @Input()
  public set date(value: Timestamp) {
    this.selectedDay = value;
  }

  @Input()
  schedule: ScheduleList;

  @Input()
  mealsList: Meal[];

  @Input()
  workoutsList: Workout[];

  @Output()
  public readonly changeDate: EventEmitter<Timestamp> = new EventEmitter<Timestamp>();

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
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) {/** */}

  ngOnChanges(): void {
    this.selectedDayIndex = DatesUtil.getIndexOfTheDay(this.selectedDay);
    this.selectedWeek = DatesUtil.getFirstDayOfTheWeek(this.selectedDay);
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
              [type]: data,
            },
            timestamp: this.selectedDay,
          }),
      );

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

  public selectWeek(offset: number): void {
    const startOfTheWeek = DatesUtil.getFirstDayOfTheWeek(this.selectedDay);
    const weekOffset = DatesUtil.getWeekOffset(startOfTheWeek, offset);
    this.changeDate.emit(weekOffset);
  }

  public selectDay(selectedDayIndex: number): void {
    const selectedDay = DatesUtil.getDayOffset(
      this.selectedWeek,
      !selectedDayIndex ? 6 : selectedDayIndex - 1,
    );
    this.changeDate.emit(selectedDay);
  }

}
