import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module')
          .then(m => m.RegisterModule),
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {/** */}
