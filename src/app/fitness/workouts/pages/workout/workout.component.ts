import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { Workout } from '../../../shared/models/workout.model';
import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'ft-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  public workout$: Observable<Workout>;

  private get workoutId(): Workout['id'] {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly workoutsService: WorkoutsService,
  ) {/** */}

  ngOnInit(): void {
    this._subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params
      .pipe(
        switchMap(({ id: workoutId }) => this.workoutsService.getWorkoutById(workoutId)),
        shareReplay(),
      );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public async addWorkout(workout: Workout): Promise<void> {
    await this.workoutsService.addWorkout(workout);
    await this.router.navigate(['workouts']);
  }

  public async editWorkout(workout: Workout): Promise<void> {
    await this.workoutsService.editWorkout(this.workoutId, workout);
    await this.router.navigate(['workouts']);
  }

  public async removeWorkout(): Promise<void> {
    await this.workoutsService.removeWorkout(this.workoutId);
    await this.router.navigate(['workouts']);
  }

}
