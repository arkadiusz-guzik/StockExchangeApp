import { Component, Input, OnInit } from '@angular/core';
import { StockDb } from 'src/app/models/stock-db';

@Component({
  selector: 'app-data-container-portfolio',
  templateUrl: './data-container-portfolio.component.html',
  styleUrls: ['./data-container-portfolio.component.scss']
})
export class DataContainerPortfolioComponent implements OnInit {

  @Input() currentStockList;
  @Input() accountBalance: number;
  @Input() stockList: StockDb[];
  constructor() { }

  ngOnInit(): void {
  }

}
