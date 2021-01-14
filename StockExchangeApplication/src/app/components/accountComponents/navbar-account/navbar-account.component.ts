import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.scss']
})
export class NavbarAccountComponent implements OnInit{
  private urlInfo:string;
  userName:string;
  

  constructor(private authorizationService: AuthorizationService) {
    this.userName = authorizationService.userValue.username;
   }

  ngOnInit(): void {
  }

  change(url):void{
    this.urlInfo=url;
  }

  clear(url):boolean{
    return url===this.urlInfo;
  }

  logout(){
    this.authorizationService.logout();
  }

  
}
