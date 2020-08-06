import { Pipe, PipeTransform } from '@angular/core';

import { Workout, WorkoutType } from '../models/workout.model';


@Pipe({
  name: 'workoutDetails'
})
export class WorkoutDetailsPipe implements PipeTransform {

  public transform(workout: Workout): string {
    return workout.type === WorkoutType.STRENGTH
      ? this.getStrengthWorkoutDetails(workout)
      : this.getEnduranceWorkoutDetails(workout);
  }

  private getStrengthWorkoutDetails({ strength }: Workout): string {
    return `Reps: ${strength.reps}, Sets: ${strength.sets}, Weight: ${strength.weight} (kg)`;
  }

  private getEnduranceWorkoutDetails({ endurance }: Workout) {
    return `Distance: ${endurance.distance} (km), Duration: ${endurance.duration} (min)`;
  }

}
