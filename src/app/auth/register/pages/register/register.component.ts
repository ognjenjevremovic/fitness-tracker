import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import AuthError = firebase.auth.AuthError;

import { AuthCredentials } from '../../../shared/models/auth.model';
import { AuthService } from '../../../shared/services/auth/auth.service';


@Component({
  selector: 'ft-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  authErrorMessage: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {/** */}

  public async registerUser({ value: credentials }: FormGroup): Promise<boolean | void> {
    try {
      await this.authService.registerUser(credentials as AuthCredentials);
      return this.router.navigate(['/']);
    } catch (authError) {
      this.authErrorMessage = (authError as AuthError).message;
    }
  }
}
