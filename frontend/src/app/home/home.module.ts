import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {AuthServiceModule} from "../core/auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {AnalyticsService} from "../core/analytics.service";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {NgbDropdownItem, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {CourseService} from "../core/course.service";
import {SharedModule} from "../shared/shared.module";
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


@NgModule({
  declarations: [],
  providers:[
    AnalyticsService,
    CourseService,
    provideCharts(withDefaultRegisterables()),
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    AuthServiceModule,
    NgbModule,
    LoadingBarModule,
  ],
})
export class HomeModule { }
