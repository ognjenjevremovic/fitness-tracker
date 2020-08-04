import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;

import { AuthCredentials } from '../../models/auth.model';
import { Store } from '../../../../store/app.store';
import { PlatformUser } from '../../models/user.model';


@Injectable()
export class AuthService {

  public get currentUser$(): Observable<User> {
    return this.auth.authState;
  }

  public readonly auth$: Observable<PlatformUser | null> = this.auth.authState
    .pipe(
      map((user: User | null) =>
        !!user ? new PlatformUser(user.uid, user.email, true) : null
      ),
      switchMap((user: PlatformUser | null) => {
        this.store.set('user', user);
        return this.store.select<PlatformUser>('user');
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

  public logoutUser(): Promise<void> {
    return this.auth.signOut();
  }
}
