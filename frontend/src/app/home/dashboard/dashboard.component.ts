import { Component } from '@angular/core';
import {AnalyticsService} from "../../core/analytics.service";
import {AnalyticsTotalInterface} from "../../shared/interfaces/analytics.interface";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private analyticsService: AnalyticsService
  ) {

  }

  totales: AnalyticsTotalInterface|undefined

  ngOnInit() {
    this.analyticsService.getTotales().subscribe((data) => {
      this.totales = data;
    });
  }
}
