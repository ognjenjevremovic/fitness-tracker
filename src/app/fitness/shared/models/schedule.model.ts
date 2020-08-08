import { BaseModel, SimpleInfo } from './base.model';
import { SimpleMealInfo } from './meal.model';
import { SimpleWorkoutInfo } from './workout.model';


export enum Section {
  MORNING = 'morning',
  LUNCH = 'lunch',
  EVENING = 'evening',
  SNACKS = 'snacks',
}

export type Schedule = Record<Section, string>;

export interface ScheduleList extends BaseModel {
  [Section.MORNING]: ScheduleItem;
  [Section.LUNCH]: ScheduleItem;
  [Section.EVENING]: ScheduleItem;
  [Section.SNACKS]: ScheduleItem;
}

export interface ScheduleItem {
  readonly meals: SimpleInfo[];
  readonly workouts: SimpleInfo[];
}
