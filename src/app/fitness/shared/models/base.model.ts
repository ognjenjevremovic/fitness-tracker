import * as firebase from 'firebase';

import Timestamp = firebase.firestore.Timestamp;
import User = firebase.User;


export interface BaseModel {
  readonly id: string;
  readonly uid: User['uid'];
  readonly timestamp: Timestamp;
  readonly lastEditDate?: Timestamp;
}
