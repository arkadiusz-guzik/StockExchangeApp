import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-charts-account',
  templateUrl: './charts-account.component.html',
  styleUrls: ['./charts-account.component.scss']
})
export class ChartsAccountComponent {
  
  public token: string;

  constructor(public stockListService: StockListService, private authorizationService:AuthorizationService) {
    this.token = this.authorizationService.userValue.token;
  }

}
