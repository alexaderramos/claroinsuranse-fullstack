import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../../core/analytics.service";
import {AnalyticsTotalInterface} from "../../shared/interfaces/analytics.interface";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData} from "chart.js";
import {
  ChartTopStudentsComponent
} from "../../shared/components/charts/chart-top-students/chart-top-students.component";
import {ChartTopCoursesComponent} from "../../shared/components/charts/chart-top-courses/chart-top-courses.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective,
    ChartTopStudentsComponent,
    ChartTopCoursesComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private analyticsService: AnalyticsService,
    private cdx: ChangeDetectorRef,
  ) {

  }

  totales: AnalyticsTotalInterface | undefined

  ngOnInit() {
    this.analyticsService.getTotales().subscribe((data) => {
      this.totales = data;
    });

  }
}
