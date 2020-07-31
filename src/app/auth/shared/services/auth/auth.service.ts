import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import UserCredential = firebase.auth.UserCredential;

import { AuthCredentials } from '../../models/auth.model';


@Injectable()
export class AuthService {

  constructor(
    private readonly auth: AngularFireAuth
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
