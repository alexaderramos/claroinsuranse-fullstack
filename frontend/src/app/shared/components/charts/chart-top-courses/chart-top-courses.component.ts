import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {AnalyticsService} from "../../../../core/analytics.service";

@Component({
  selector: 'app-chart-top-courses',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './chart-top-courses.component.html',
  styleUrl: './chart-top-courses.component.scss'
})
export class ChartTopCoursesComponent implements OnInit
{

  constructor(
    private cdx: ChangeDetectorRef,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit() {
    this.analyticsService.getTopCourses().subscribe((data) => {
      console.log(data)
      const labels = data.map((course) => course.name);
      const topCourses = data.map((course) => course.students_count);
      this.barChartDataCourses.datasets[0].data = topCourses;
      this.barChartDataCourses.labels = labels;
      this.cdx.detectChanges();
      this.chart?.update();
    });
  }

  public barChartType = 'bar' as const;
  barChartDataCourses: ChartData<'bar'> = {
    labels: ['Top 1', 'Top 2', 'Top 3'],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Estudiantes:',
        backgroundColor: 'rgba(172, 78, 198, 1)',
        borderColor: 'rgba(172, 78, 198, 1)',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        display: true,
        border: {
          dash: [10, 5],
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        align: 'center',
        position: 'top',
        text: 'Top 3 Cursos con estudiantes',
        display: true,
      },

    },
  };
}
