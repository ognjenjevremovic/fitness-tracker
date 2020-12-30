import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[ftToggleRemoveActions]',
  exportAs: 'ftToggleRemoveActions',
})
export class ToggleRemoveActionsDirective {
  public showRemoveActions = false;

  @HostListener('click')
  public toggle(): void {
    this.showRemoveActions = !this.showRemoveActions;
  }
}
