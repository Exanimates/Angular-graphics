import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgApexchartsModule } from "ng-apexcharts";
import { EChartsOption } from 'echarts';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexStroke
} from "ng-apexcharts";
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { Resources } from './types/resources';

export type apexChartOptions = {
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
  imports: [RouterOutlet, NgxEchartsDirective, MatCardModule, NgApexchartsModule, MatGridListModule, ResourceFormComponent, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class AppComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public apexOption: Partial<apexChartOptions>;

  apexDataGas: Array<number> = [];
  apexDataFuel: Array<number> = [];
  sumFuel: Array<number> = [];

  categoriesData : Array<string> = ["2024-03-26","2024-03-27","2024-03-28","2024-03-29","2024-03-30","2024-03-31","2024-04-01"];


  title = 'Angular-graphics';
  echartOption: EChartsOption = {};

  constructor() {
    this.apexOption = {
        series: [
          {
            name: "series1",
            data: this.apexDataGas
          },
          {
            name: "series2",
            data: this.apexDataFuel
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
          categories: this.categoriesData
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };

      this.echartOption = {
        xAxis: {
          type: 'category',
          data: this.categoriesData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.apexDataGas,
          type: 'scatter',
          name: 'Выбросы CO2 газ'
        }, {
          data: this.apexDataFuel,
          type: 'scatter',
          name: 'Выбросы CO2 твер. топливо'
        }]
      };
  }

  coalChange(coal: Resources) {
    this.apexDataFuel.push(this.getEmissionsSolidFuel(parseFloat(coal.resource)));

    this.updateEchart(coal.dateInputResource.toISOString());
    this.updateApexChart(coal.dateInputResource.toISOString());
  }

  gasChange(gas: Resources) {
    this.apexDataGas.push(this.getEmissionsGas(parseFloat(gas.resource)));

    this.updateEchart(gas.dateInputResource.toISOString());
    this.updateApexChart(gas.dateInputResource.toISOString());
  }

  updateEchart(dateResource: string) {
    this.categoriesData.push(dateResource);

    const name = "Общая сумма выбросов CO2 (тонн) " + this.calculateSum(this.apexDataGas, this.apexDataFuel).toString();

    this.echartOption = {
      xAxis: {
        type: 'category',
        data: this.categoriesData
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        data: ['Выбросы CO2 газ (тонн)', 'Выбросы CO2 твер. топливо (тонн)', name]
      },
      series: [{
        data: this.apexDataGas,
        type: 'scatter',
        name: 'Выбросы CO2 газ (тонн)'
      }, {
        data: this.apexDataFuel,
        type: 'scatter',
        name: 'Выбросы CO2 твер. топливо (тонн)'
      }, 
      {
        data: [],
        type: 'scatter',
        name: name
      }]
    };
  }

  updateApexChart(dateResource: string) {

    this.categoriesData.push(dateResource);
    const name = "Общая сумма выбросов CO2 (тонн) " + this.calculateSum(this.apexDataGas, this.apexDataFuel).toString();

    this.apexOption = {
      series: [
        {
          name: "Выбросы CO2 газ (тонн)",
          data: this.apexDataGas
        },
        {
          name: "Выбросы CO2 твер. топливо (тонн)",
          data: this.apexDataFuel
        },
        {
          name: name,
          data: []
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
        categories: this.categoriesData
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  getEmissionsGas(gasResource: number) {
    return (gasResource * 1.129) * 1.59;
  }

  getEmissionsSolidFuel(coalResource: number) {
    return (coalResource * 0.768) * 2.76;
  }

  calculateSum(array1: number[], array2: number[]) {
    const resultArray = [];

    const minLength = Math.min(array1.length, array2.length);
    for (let i = 0; i < minLength; i++) {
        resultArray.push(array1[i] + array2[i]);
    }

    if (array1.length > minLength) {
        resultArray.push(...array1.slice(minLength));
    } else if (array2.length > minLength) {
        resultArray.push(...array2.slice(minLength));
    }

    return resultArray;
  }

}
