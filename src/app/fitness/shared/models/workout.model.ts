import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { PlatformUser } from '../../../auth/shared/models/user.model';


export enum WorkoutType {
  ENDURANCE = 'endurance',
  STRENGTH = 'strength',
}

export interface Workout {
  readonly name: string;
  readonly type: WorkoutType;
  readonly id: string;
  readonly timestamp: Timestamp;
  readonly uid: PlatformUser['uid'];
  readonly lastEdit?: Timestamp;
}
