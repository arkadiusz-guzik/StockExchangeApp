import { OnChanges, SimpleChanges } from '@angular/core';
import {AfterViewInit, OnInit, Component, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HistoryDb } from 'src/app/models/history-db';


@Component({
  selector: 'app-stock-list-history-account',
  templateUrl: './stock-list-history-account.component.html',
  styleUrls: ['./stock-list-history-account.component.scss']
})
export class StockListHistoryAccountComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() stockList: HistoryDb[];
  displayedColumns: string[] = ['date', 'action', 'name', 'price', 'number', 'totalPrice', 'accountBalance'];
  dataSource: MatTableDataSource<HistoryDb>;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<HistoryDb>(this.stockList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<HistoryDb>(this.stockList);
    this.dataSource.paginator = this.paginator;
  }
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
}
