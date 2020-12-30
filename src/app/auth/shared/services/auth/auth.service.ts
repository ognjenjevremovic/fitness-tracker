import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthCredentials } from '../../models/auth.model';
import { Store } from '../../../../store/app.store';
import { PlatformUser } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get currentUser$(): Observable<PlatformUser> {
    return this.auth.authState
      .pipe(
        map((user: User | null) =>
          !!user ?
            new PlatformUser(user.uid, user.email, true)
            : null
        )
      );
  }

  public readonly auth$: Observable<PlatformUser | null> = this.currentUser$
    .pipe(
      tap((user: PlatformUser | null) => this.store.set('user', user))
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
