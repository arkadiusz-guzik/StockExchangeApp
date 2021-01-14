import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { StockDb } from 'src/app/models/stock-db';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss']
})
export class PortfolioSummaryComponent implements OnInit {

  @Input() currentStockList: StockListService;
  @Input() accountBalance: number;
  @Input() stockList: StockDb[];

  profit:number = 0;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  stockValue(): number{
    let value = 0;
    this.stockList.forEach(data => {value = value + (data.number * data.price)})
    value = value + this.computeProfit();
    return value;
  }

  computeProfit():number{
    this.profit = 0;
    this.stockList.forEach(data => { this.currentStockList.resultsList.forEach(element =>{ element.data[0].s === data.shortcut ?  this.profit =+ (element.data[0].p-data.price)*data.number : 0 })})
    return this.profit;
  }

}
