import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { ChartData } from 'src/app/models/chart-data';
import { ChartDataFormat } from 'src/app/models/chart-data-format';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit, OnChanges{


  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  colorScheme = {
    domain: ['#5AA454']
  };
  @Input() chartData: ChartData;
  chartDataFormat: ChartDataFormat;
 
  constructor(private datepipe: DatePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatData();
  }


  ngOnInit(): void {
  }

  formatData(){
    this.chartDataFormat = new ChartDataFormat();
    for(let i=0; i<this.chartData.t.length; i++){
      this.chartDataFormat.series[0].data.push({
        x: this.datepipe.transform(new Date(this.chartData.t[i]*1000),'yy-MM-dd HH:mm'),
        y: [this.chartData.o[i].toFixed(2), this.chartData.h[i].toFixed(2), this.chartData.l[i].toFixed(2), this.chartData.c[i].toFixed(2)]
      });
    }
  }

}
