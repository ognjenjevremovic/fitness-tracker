import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import UserCredential = firebase.auth.UserCredential;

import { AuthCredentials } from '../../models/auth.model';
import { Store } from '../../../../store/app.store';
import { PlatformUser } from '../../models/user.model';


@Injectable()
export class AuthService {
  public readonly authState$: Observable<PlatformUser | null> = this.auth.authState
    .pipe(
      switchMap((user: User | null) => {
        if (!user) {
          this.store.set('user', null);
          return EMPTY;
        }
        const { uid, email } = user;
        this.store.set('user', new PlatformUser(uid, email, true));
        return EMPTY;
      })
    );

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: Store
  ) {/** */}

  public loginUser(
    { email, password }: AuthCredentials
  ): Promise<UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public registerUser(
    { email, password }: AuthCredentials
  ): Promise<UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
