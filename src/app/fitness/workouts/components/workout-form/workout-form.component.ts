import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { Workout, WorkoutType } from '../../../shared/models/workout.model';


@Component({
  selector: 'ft-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnChanges, OnInit {

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
    name: ['', Validators.required],
    type: [WorkoutType.ENDURANCE, Validators.required],
    strength: this.fb.group({
      sets: [0, [Validators.min(1)]],
      reps: [0, [Validators.min(1)]],
      weight: [0, [Validators.min(1)]],
    }, Validators.required),
    endurance: this.fb.group({
      distance: [0, [Validators.min(1)]],
      duration: [0, [Validators.min(1)]],
    }, Validators.required),
  });

  public get workoutNameRequired(): boolean {
    return (
      this.workoutForm.get('name').hasError('required')
      && this.workoutForm.get('name').touched
    );
  }

  public get ofTypeEndurance(): boolean {
    return this.workoutForm.get('type').value === WorkoutType.ENDURANCE;
  }

  public get ofTypeStrength(): boolean {
    return this.workoutForm.get('type').value === WorkoutType.STRENGTH;
  }

  public get workoutNamePlaceholder(): string {
    return this.workoutForm.get('type').value === WorkoutType.STRENGTH
      ? 'e.g. Benchpress'
      : 'e.g. Tredmill';
  }

  constructor(
    private readonly fb: FormBuilder,
  ) {/** */}

  ngOnInit(): void {
    this.workoutForm.get('type').valueChanges
      .pipe(
        tap(this.setValidatorsDynamically.bind(this))
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && !!Object.keys(this.workout).length) {
      this.editingWorkout = true;
      this.workoutForm.patchValue(this.workout);
    }
    this.setValidatorsDynamically(this.workoutForm.get('type').value);
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

  private setValidatorsDynamically(type: WorkoutType): void {
    if (type === WorkoutType.STRENGTH) {
      this.workoutForm.get('endurance').disable();
      this.workoutForm.get('strength').enable();
    } else {
      this.workoutForm.get('strength').disable();
      this.workoutForm.get('endurance').enable();
    }
  }

}
