import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ListItemComponent } from './components/list-item/list-item.component';
import { RemoveItemComponent } from './components/remove-item/remove-item.component';
import { ToggleRemoveActionsDirective } from './directives/toggle-remove-actions/toggle-remove-actions.directive';
import { IngredientsPipe } from './pipes/ingredients.pipe';
import { WorkoutDetailsPipe } from './pipes/workout-details.pipe';


@NgModule({
  declarations: [
    ListItemComponent,
    RemoveItemComponent,
    ToggleRemoveActionsDirective,
    IngredientsPipe,
    WorkoutDetailsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
  ],
  exports: [
    ListItemComponent,
    RemoveItemComponent,
    ToggleRemoveActionsDirective,
    ReactiveFormsModule,
    IngredientsPipe,
    WorkoutDetailsPipe,
  ],
})
export class SharedModule {/** */}
