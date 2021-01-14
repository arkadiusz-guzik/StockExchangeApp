import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorrectTransactionComponent } from 'src/app/alerts/account/correct-transaction/correct-transaction.component';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
