
import {AfterViewInit, OnInit, Component, ViewChild, Input} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { StockDb } from 'src/app/models/stock-db';
import { StockListService } from 'src/app/services/stock-list.service';


@Component({
  selector: 'app-stock-list-portfolio-account',
  templateUrl: './stock-list-portfolio-account.component.html',
  styleUrls: ['./stock-list-portfolio-account.component.scss']
})
export class StockListPortfolioAccountComponent implements AfterViewInit, OnInit{
  
  
  @Input() currentStockList:StockListService;
  @Input() stockList: StockDb[];
  listOfStock: StockDb[];
  displayedColumns: string[] = ['shortcut','name', 'number','PL', 'totalPL'];
  dataSource: MatTableDataSource<StockDb>;
  total:number=0;
  constructor(){
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<StockDb>(this.stockList);
  }

  @ViewChild(MatSort) sort: MatSort;

  computeTotal(stockList:Array<StockDb>): number{
    this.total = 0;
    stockList.forEach(element => {
      this.total = this.total + this.totalPL(element.shortcut);
    });
    return this.total;
  }

  totalPL(stockName:string): number{
    for(let item of this.currentStockList.resultsList){
      if(item.data[0].s === stockName){
        return item.data[0].p;
      }
    }
    return -1;
  }

  profitLoss(stockName:string, stockPrice:number): number{
    let totalPl = this.totalPL(stockName);
    return ((totalPl-stockPrice)/stockPrice);
  }
}
