import { Component, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent{

  constructor(private authorizationService: AuthorizationService, public chartsService: ChartsService) {
    this.chartsService.updatePrice(this.authorizationService.userValue.user_id, this.authorizationService.userValue.token);
  }

}
