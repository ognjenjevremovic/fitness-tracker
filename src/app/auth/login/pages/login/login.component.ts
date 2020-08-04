import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import AuthError = firebase.auth.AuthError;

import { AuthCredentials } from '../../../shared/models/auth.model';
import { AuthService } from '../../../shared/services/auth/auth.service';


@Component({
  selector: 'ft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authErrorMessage: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {/** */}

  public async loginUser({ value: credentials }: FormGroup): Promise<boolean | void> {
    try {
      await this.authService.loginUser(credentials as AuthCredentials);
      await this.router.navigate(['/']);
    } catch (authError) {
      this.authErrorMessage = (authError as AuthError).message;
    }
  }
}
