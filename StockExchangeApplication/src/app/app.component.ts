import { Component } from '@angular/core';
import { UserDb } from './models/user-db';
import { UserDto } from './models/user-dto';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockExchangeApp';
  user: UserDto;

  constructor(private authorizationService: AuthorizationService){
    this.authorizationService.user.subscribe(res => this.user = res);
  }
}
