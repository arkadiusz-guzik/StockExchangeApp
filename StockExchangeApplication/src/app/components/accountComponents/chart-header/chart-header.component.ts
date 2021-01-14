import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'src/app/models/chart-data';
import { Stock } from 'src/app/models/stock';
import { SubscribedStocks } from 'src/app/models/subscribed-stocks';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-chart-header',
  templateUrl: './chart-header.component.html',
  styleUrls: ['./chart-header.component.scss']
})
export class ChartHeaderComponent implements OnInit {

  @Input() subscribedStocks: SubscribedStocks;
  @Input() lastPrice:number;
  @Input() stockId:number;
  @Input() stockList : StockListService;
  
  constructor() { }

  ngOnInit(): void {
  }


  precent(): number{
    return 1-this.stockList.resultsList[this.stockId].data[0].p/this.lastPrice;
  }

}
