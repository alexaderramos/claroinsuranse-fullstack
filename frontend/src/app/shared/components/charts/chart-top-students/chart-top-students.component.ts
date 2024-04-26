import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData} from "chart.js";
import {AnalyticsService} from "../../../../core/analytics.service";

@Component({
  selector: 'app-chart-top-students',
  standalone: true,
    imports: [
        BaseChartDirective
    ],
  templateUrl: './chart-top-students.component.html',
  styleUrl: './chart-top-students.component.scss'
})
export class ChartTopStudentsComponent implements OnInit {
  public barChartType = 'bar' as const;


  constructor(
    private cdx: ChangeDetectorRef,
    private analyticsService: AnalyticsService
  ) {
  }
  ngOnInit() {
     this.analyticsService.getTopStudents().subscribe((data) => {
      const labels = data.map((student) => student.name);
      const topStudents = data.map((student) => student.courses_count);
      this.barChartData.datasets[0].data = topStudents;
      this.barChartData.labels = labels;
      this.cdx.detectChanges();
      this.chart?.update();
    });
  }

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
        text: 'Top 3 estudiantes con más cursos inscritos',
        display: true,
      },

    },
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Top 1', 'Top 2', 'Top 3'],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Cursos inscritos:',
        backgroundColor: 'rgba(255, 197, 1,1)',
        borderColor: 'rgba(255, 197, 1,1)',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };
}
