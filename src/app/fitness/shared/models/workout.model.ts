import { BaseModel } from './base.model';


export enum WorkoutType {
  ENDURANCE = 'endurance',
  STRENGTH = 'strength',
}

export interface StrengthWorkoutDetails {
  readonly sets: number;
  readonly reps: number;
  readonly weight: number;
}

export interface EnduranceWorkoutDetails {
  readonly distance: number;
  readonly duration: number;
}

export interface Workout extends BaseModel {
  readonly name: string;
  readonly type: WorkoutType;
  readonly strength?: StrengthWorkoutDetails;
  readonly endurance?: EnduranceWorkoutDetails;
}

export type SimpleWorkoutInfo = Pick<Workout, 'name'> & Pick<Workout, 'id'>;
