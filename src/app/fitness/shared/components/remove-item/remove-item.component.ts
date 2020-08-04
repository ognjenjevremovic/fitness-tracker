import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'ft-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrls: ['./remove-item.component.scss']
})
export class RemoveItemComponent {
  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggleActions: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public showRemoveActions = false;

  toggleRemoveActions(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.toggleActions.emit();
  }

  removeItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.remove.emit();
  }
}


