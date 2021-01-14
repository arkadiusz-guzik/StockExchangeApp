import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wrong-transaction',
  templateUrl: './wrong-transaction.component.html',
  styleUrls: ['./wrong-transaction.component.scss']
})
export class WrongTransactionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
