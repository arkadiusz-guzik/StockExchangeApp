import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryAccountComponent } from 'src/app/containers/accountContainers/history-account/history-account.component';
import { AccountRoutingModule } from 'src/app/pages/account/account-routing.module';
import { StockListHistoryAccountComponent } from '../stock-list-history-account/stock-list-history-account.component';

@Component({
  selector: 'app-stock-search-history-account',
  templateUrl: './stock-search-account.component.html',
  styleUrls: ['./stock-search-account.component.scss']
})
export class StockSearchHistoryAccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  doSearch(value){
    this.router.navigateByUrl(`account/history/search/${value}`);
  }
}
