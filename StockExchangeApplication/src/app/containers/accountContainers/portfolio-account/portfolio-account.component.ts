import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { StockDb } from 'src/app/models/stock-db';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ChartsService } from 'src/app/services/charts.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-portfolio-account',
  templateUrl: './portfolio-account.component.html',
  styleUrls: ['./portfolio-account.component.scss']
})
export class PortfolioAccountComponent implements OnInit{
  
  accountBalance;
  userId: number;
  token:string;
  public stockList: StockDb[];
  constructor(private portfolioService: PortfolioService, 
              private authorizationService: AuthorizationService,
              public stockListService: StockListService,
              private chartsService: ChartsService) {
                
    this.userId = this.authorizationService.userValue.user_id;
    this.token = this.authorizationService.userValue.token;
    this.chartsService.updatePrice(this.authorizationService.userValue.user_id, this.authorizationService.userValue.token);
   }
  ngOnInit(): void {
    this.portfolioService.getListOfStock(this.userId,this.token).subscribe(data => this.stockList = data);
    this.accountBalance = this.chartsService.userMoneySubject.value;
  
  }

  
}
