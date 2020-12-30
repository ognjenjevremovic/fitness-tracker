import * as firebase from 'firebase';

import Timestamp = firebase.firestore.Timestamp;
import User = firebase.User;


export interface BaseModel {
  readonly id: string;
  readonly uid: User['uid'];
  readonly timestamp: Timestamp;
  readonly lastEditDate?: Timestamp;
}

export interface SimpleInfo {
  readonly id: string;
  readonly name: string;
}

export interface BaseModelWithName extends BaseModel {
  name: string;
}
