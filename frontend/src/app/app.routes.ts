import { Routes } from '@angular/router';


const MAIN = 'home';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },{
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];
