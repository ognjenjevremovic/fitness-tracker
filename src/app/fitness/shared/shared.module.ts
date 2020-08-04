import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MealsService } from './services/meals/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { RemoveItemComponent } from './components/remove-item/remove-item.component';
import { ToggleRemoveActionsDirective } from './directives/toggle-remove-actions/toggle-remove-actions.directive';


@NgModule({
  declarations: [ListItemComponent, RemoveItemComponent, ToggleRemoveActionsDirective],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  exports: [ListItemComponent, RemoveItemComponent, ToggleRemoveActionsDirective]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService]
    };
  }
}
