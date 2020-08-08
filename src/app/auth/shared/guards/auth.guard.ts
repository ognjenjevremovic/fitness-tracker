import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {/** */}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.currentUser$
      .pipe(
        map(user => {
          //  /auth
          //  only allow unauthenticated users
          if (route.url[0].path === 'auth') {
            if (!!user) {
              this.router.navigate(['']);
            }
            return !user;
          }

          //  /meals, /workouts and /schedule
          //  allow only authenticated users
          if (!user) {
            this.router.navigate(['auth', 'login']);
          }
          return !!user;
        })
      );
  }
}
