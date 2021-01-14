import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftbar-account',
  templateUrl: './leftbar-account.component.html',
  styleUrls: ['./leftbar-account.component.scss']
})
export class LeftbarAccountComponent implements OnInit {

  @Input() stockList;
  constructor() { }

  ngOnInit(): void {
  }

}
