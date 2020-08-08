import { InjectionToken, Provider } from '@angular/core';

import { Schedule, Section } from '../models/schedule.model';


const SCHEDULE: Schedule = {
  [Section.MORNING]: 'Morning',
  [Section.LUNCH]: 'Lunch',
  [Section.EVENING]: 'Evening',
  [Section.SNACKS]: 'Snacks and Drinks'
};

export const SCHEDULE_TOKEN: InjectionToken<Schedule> = new InjectionToken<Schedule>('SCHEDULE');


export const SCHEDULE_PROVIDER: Provider = {
  provide: SCHEDULE_TOKEN,
  useValue: SCHEDULE
};
