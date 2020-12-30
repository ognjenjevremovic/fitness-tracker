import { ChangeDetectionStrategy, Component, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WorkoutType } from '../../../shared/models/workout.model';


const TYPE_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

type noop = () => void;
type modelChange = (value: WorkoutType) => void;


@Component({
  selector: 'ft-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_VALUE_ACCESSOR]
})
export class WorkoutTypeComponent implements ControlValueAccessor {

  private onModelChange: modelChange;
  private onTouched: noop;

  public readonly workoutTypes: WorkoutType[] = [WorkoutType.ENDURANCE, WorkoutType.STRENGTH];
  public value: WorkoutType;

  registerOnChange(fn: modelChange): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: noop): void {
    this.onTouched = fn;
  }

  writeValue(value: WorkoutType): void {
    this.value = value;
  }

  public setWorkoutType(type: WorkoutType): void {
    this.value = type;
    this.onModelChange(this.value);
    this.onTouched();
  }
}
