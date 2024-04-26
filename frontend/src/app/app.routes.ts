import {Routes} from '@angular/router';
import {NoAuthGuard} from "./core/auth/guards/no-auth.guard";
import {AuthGuard} from "./core/auth/guards/auth.guard";


const MAIN = 'home';
export const routes: Routes = [

  {
    path: '',
    redirectTo: MAIN,
    pathMatch: 'full'
  },
  {path: 'login-redirect', pathMatch: 'full', redirectTo: MAIN},
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }, {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

];
