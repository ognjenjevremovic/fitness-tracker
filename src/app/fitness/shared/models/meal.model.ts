import { PlatformUser } from '../../../auth/shared/models/user.model';
import * as firebase from 'firebase';

import Timestamp = firebase.firestore.Timestamp;

export interface Meal {
  readonly id: string;
  readonly name: string;
  readonly ingredients: string[];
  readonly timestamp: Timestamp;
  readonly uid: PlatformUser['uid'];
  readonly lastEdit?: Timestamp;
}
