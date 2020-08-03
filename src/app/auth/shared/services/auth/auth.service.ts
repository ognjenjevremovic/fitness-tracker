import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;

import { AuthCredentials } from '../../models/auth.model';
import { Store } from '../../../../store/app.store';
import { PlatformUser } from '../../models/user.model';


@Injectable()
export class AuthService {

  public get currentUser$(): Observable<PlatformUser> {
    return this.authState$;
  }

  public readonly authState$: Observable<PlatformUser | null> = this.auth.authState
    .pipe(
      switchMap((user: User | null) => {
        const platformUser: PlatformUser = !!user
          ? new PlatformUser(user.uid, user.email, true)
          : null;
        this.store.set('user', platformUser);
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
