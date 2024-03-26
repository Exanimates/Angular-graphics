import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgApexchartsModule } from "ng-apexcharts";
import { EChartsOption } from 'echarts';
import { MatCardModule } from '@angular/material/card';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxEchartsDirective, MatCardModule, NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class AppComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public apexOption: Partial<ChartOptions>;

  title = 'Angular-graphics';
  echartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'scatter'
    }]
  };

  constructor() {
    this.apexOption = {
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100]
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41]
          }
        ],
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
  }
}
