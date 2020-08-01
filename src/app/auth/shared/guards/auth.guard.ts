import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '../../../store/app.store';
import { PlatformUser } from '../models/user.model';


@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {/** */}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select<PlatformUser>('user')
      .pipe(
        map(user => {
          if (!!user) {
            this.router.navigate(['auth', 'login']);
          }
          return !!user;
        })
      );
  }
}
