import { Component, Input, OnInit } from '@angular/core';
import { StockDb } from 'src/app/models/stock-db';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-chart-summary-portfolio',
  templateUrl: './chart-summary-portfolio.component.html',
  styleUrls: ['./chart-summary-portfolio.component.scss']
})
export class ChartSummaryPortfolioComponent implements OnInit {

  @Input() currentStockList: StockListService;
  @Input() accountBalance: number;
  @Input() stockList: StockDb[];

  data: any[];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#48E3C4', '#9DF9E7']
  };

  constructor() { 
  }

  ngOnInit(): void {
    this.data = [
      {
        "name": "Stock",
        "value": this.stockValue()
      },
      {
        "name": "Equity",
        "value": this.accountBalance
      }
    ];
  }

  stockValue(): number{
    let value = 0;
    this.stockList.forEach(data => {value = value + (data.number * data.price)})
    value = value + this.computeProfit();
    return value;
  }

  computeProfit():number{
    let profit = 0;
    this.stockList.forEach(data => { this.currentStockList.resultsList.forEach(element =>{ element.data[0].s === data.name ?  profit =+ (element.data[0].p-data.price)*data.number : 0 })})
    return profit;
  }

  

  onSelect(data): void {
   
  }

  onActivate(data): void {
    
  }

  onDeactivate(data): void {
   
  }

}
