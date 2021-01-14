import { Component, Input, OnInit} from '@angular/core';
import { ChartData } from 'src/app/models/chart-data';
import { SubscribedStocks } from 'src/app/models/subscribed-stocks';
import { ChartsService } from 'src/app/services/charts.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  @Input() stockList: StockListService;
  @Input() token: string;
  lastPrice: number;
  chartData: ChartData;
  stockName:string = "AAPL";
  stockId:number = 0;
  subscribedStocks: SubscribedStocks = new SubscribedStocks();

  private btnId:string = "D";
  mode = "indeterminate";
  constructor(private chartsService: ChartsService) {
    this.chartsService.getChartData(this.stockName,"D").subscribe(res => this.chartData = res);
    this.chartsService.getLastPrice(this.stockName).subscribe(res => res.c[0]!=undefined?this.lastPrice = res.c[0]:this.lastPrice=0);
    this.lastPrice;
   }

  ngOnInit(): void {
    this.chartsService.stockIdSubject.subscribe((event) => {
      this.stockName = this.stockList.resultsList[event].data[0].s;
      this.stockId = event;
      if(this.stockName != "Loading"){
        this.chartsService.getChartData(this.stockName,"D").subscribe(res => this.chartData = res);
        this.chartsService.getLastPrice(this.stockName).subscribe(res => res.c[0]!=undefined?this.lastPrice = res.c[0]:this.lastPrice=0);
      }
    });
  }

  uploadData(time:string){
    this.chartsService.getChartData(this.stockList.resultsList[this.chartsService.stockId].data[0].s, time).subscribe(res => this.chartData = res);
    this.btnId = time;
  }

  clear(currentBtnId:string){
    return currentBtnId===this.btnId;
  }
}
