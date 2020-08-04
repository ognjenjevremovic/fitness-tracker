import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Workout, WorkoutType } from '../../../shared/models/workout.model';


@Component({
  selector: 'ft-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnChanges {

  @Input()
  public readonly workout: Workout;

  @Output()
  public readonly create: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  public readonly update: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  public readonly delete: EventEmitter<void> = new EventEmitter<void>();

  public editingWorkout: boolean;

  public readonly workoutForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    type: this.fb.control(WorkoutType.ENDURANCE, [Validators.required]),
  });

  public get workoutNameRequired(): boolean {
    return (
      this.workoutForm.get('name').hasError('required')
      && this.workoutForm.get('name').touched
    );
  }

  constructor(
    private readonly fb: FormBuilder,
  ) {/** */}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && !!Object.keys(this.workout).length) {
      this.editingWorkout = true;
      this.workoutForm.patchValue(this.workout);
    }
  }

  public createWorkout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.workoutForm.valid) {
      this.create.emit(this.workoutForm.value);
    }
  }

  public updateWorkout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.workoutForm.valid) {
      this.update.emit(this.workoutForm.value);
    }
  }

  public deleteWorkout(): void {
    this.delete.emit();
  }

}
