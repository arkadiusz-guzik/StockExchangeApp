import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss']
})
export class TransactionContainerComponent implements OnInit {

  @Input() subscribedStocks;
  @Input() stockId:number;
  @Input() stockList;
  userId: number;
  userBalance: number;
  buy="Buy";
  sell="Sell";
  token:string;
  
  constructor(private authorizationService: AuthorizationService, public chartsService: ChartsService) {
    this.userId = this.authorizationService.userValue.user_id;
    this.userBalance = this.chartsService.userMoneySubject.value; 
    this.token = this.authorizationService.userValue.token; 
  }

  ngOnInit(): void {
  }

}
