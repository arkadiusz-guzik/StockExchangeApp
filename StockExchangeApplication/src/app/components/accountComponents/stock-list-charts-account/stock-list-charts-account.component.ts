import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { ChartsService } from 'src/app/services/charts.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-stock-list-charts-account',
  templateUrl: './stock-list-charts-account.component.html',
  styleUrls: ['./stock-list-charts-account.component.scss']
})
export class StockListChartsAccountComponent implements OnInit {

  @Input() stockList: StockListService;
  constructor(private chartsService: ChartsService) {
  }

  ngOnInit(): void {
  }

  setStockId(id: number){
   this.chartsService.setStockId(id);
  }
}
