import { BaseModel } from './base.model';
import { Meal } from './meal.model';
import { Workout } from './workout.model';


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
  readonly meals: ScheduleItemPartial<Meal>[];
  readonly workouts: ScheduleItemPartial<Workout>[];
}

interface ScheduleItemPartial<T extends BaseModel & { name: string }> {
  readonly id: Pick<T, 'id'>;
  readonly name: Pick<T, 'name'>;
}
