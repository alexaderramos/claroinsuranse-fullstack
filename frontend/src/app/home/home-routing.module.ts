import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../core/auth/guards/auth.guard";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: '',
    canMatch: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
