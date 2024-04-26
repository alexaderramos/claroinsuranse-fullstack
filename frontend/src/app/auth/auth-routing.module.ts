import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NoAuthGuard} from "../core/auth/guards/no-auth.guard";
import {AuthGuard} from "../core/auth/guards/auth.guard";

const routes: Routes = [

  {
    path: 'login',
    canMatch: [NoAuthGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canMatch: [NoAuthGuard],
    component: RegisterComponent
  },
  {
    path: '',
    canMatch: [NoAuthGuard],
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
