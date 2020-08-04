import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../../store/app.store';
import { Workout } from '../../../shared/models/workout.model';
import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'ft-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  public workouts$: Observable<Workout[]>;

  constructor(
    private readonly router: Router,
    private readonly workoutsService: WorkoutsService,
    private readonly store: Store
  ) {/** */}

  ngOnInit(): void {
    this._subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>('workouts');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public async navigateToWorkoutDetails(workout: Workout): Promise<void> {
    console.log('navigating to', workout.id);
    await this.router.navigate(['workouts', workout.id]);
  }

  public async onWorkoutRemove(workout: Workout): Promise<void> {
    await this.workoutsService.removeWorkout(workout.id);
  }
}
