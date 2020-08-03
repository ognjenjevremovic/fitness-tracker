import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '../../../store/app.store';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {/** */}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$
      .pipe(
        map(user => {
          if (!user) {
            this.router.navigate(['auth', 'login']);
          }
          return !!user;
        })
      );
  }
}
