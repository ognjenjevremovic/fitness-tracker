import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MealsService } from './services/meals/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component';


@NgModule({
  declarations: [ListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  exports: [ListItemComponent]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService]
    };
  }
}
