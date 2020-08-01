import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlatformUser } from './auth/shared/models/user.model';
import { AuthService } from './auth/shared/services/auth/auth.service';
import { Store } from './store/app.store';

@Component({
  selector: 'ft-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public user$: Observable<PlatformUser>;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService
  ) {/** */}

  ngOnInit(): void {
    this._subscription = this.authService.authState$.subscribe();
    this.user$ = this.store.select<PlatformUser>('user');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
