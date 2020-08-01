import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PlatformUser } from '../../auth/shared/models/user.model';

@Component({
  selector: 'ft-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {

  @Output()
  logout: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  user: PlatformUser;

  logoutUser(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.logout.emit();
  }
}
