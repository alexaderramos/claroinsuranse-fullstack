import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthServiceModule} from "../core/auth/auth.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthServiceModule
  ],
  providers: []
})
export class AuthModule { }
