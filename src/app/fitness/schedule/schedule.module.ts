import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SCHEDULE_PROVIDER } from '../shared/tokens/schedule.token';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';
import { ScheduleModalComponent } from './components/schedule-modal/schedule-modal.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent,
    ScheduleItemComponent,
    ScheduleModalComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
  ],
  providers: [SCHEDULE_PROVIDER]
})
export class ScheduleModule {}
