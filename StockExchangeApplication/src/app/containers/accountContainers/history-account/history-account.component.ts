import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryDb } from 'src/app/models/history-db';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-account',
  templateUrl: './history-account.component.html',
  styleUrls: ['./history-account.component.scss']
})
export class HistoryAccountComponent implements OnInit {
 
  public stockList: HistoryDb[];
  searchMode: string = '';
  userId:number;
  token:string;

  constructor(private historyService: HistoryService,
              private route: ActivatedRoute,
              private authorizationService: AuthorizationService) {
    this.userId = this.authorizationService.userValue.user_id;
    this.token = this.authorizationService.userValue.token;
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getStockList();
    });
  }

  getStockList(){
    this.searchMode = this.route.snapshot.paramMap.get('value');
    if(this.searchMode != '' && this.searchMode != null){
      this.handleSearchStocks();
    }else{
      this.handleStockList();
    }   
  }

  handleSearchStocks(){
    const value: string = this.route.snapshot.paramMap.get('value');
    this.historyService.searchStock(this.userId, value, this.token).subscribe(data => { this.stockList = data});
  }

  handleStockList(){
    this.historyService.getListOfStock(this.userId,this.token).subscribe(data => {this.stockList = data});
  }

}
